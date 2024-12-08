#include <stdio.h>
#include <string.h>
#include <string>
#include <list>
#include <stdint.h>

#include <zlib.h>

using namespace std;

#pragma pack(push, 1)		   /// Align in-memory structure of 1 byte
struct grf_header
{
char Magic[16];			 /// "Master of Magic" +\0
char Key[14];			 	 /// 0x01 -> 0x0E, or 0x00 -> 0x00 (no encryption)
uint32_t FileTableOffset;   /// The location of the file table
uint32_t Seed;				/// What is the value of randomly
uint32_t FilesCount;		/// The actual number of files = FilesCount - Seed - 7
uint32_t Version;	   	 /// GRF file version: 0x102, 0x103, 0x200
};
#pragma pack(pop)

#define GRF_HEADER "Master of Magic"
#define GRF_HEADER_SIZE 46

#pragma pack(push, 1)   /// Align in-memory structure of 1 byte
struct grf_fentry
{
uint32_t zSize;		/// Size of packed data
uint32_t zSizeAl;   /// The same thing only with alignment
uint32_t Size;		/// Size of uncompressed data
uint8_t Flags;		/// Flag file (GRF_FLAG_FILE, GRF_FLAG_MIXCRYPT, GRF_FLAG_DES)
uint32_t Offset;	/// offset into the GRF file (starts immediately after grf_header)
};
#pragma pack(pop)

#define GRF_TABLE_SIZE 17

#define GRF_FLAG_FILE 1
#define GRF_FLAG_MIXCRYPT 2
#define GRF_FLAG_DES 4

struct _FileNode
{
std::string FileName;   /// File Name
uint32_t NameHash;	  /// Hash the file name
uint32_t FileOffset;	/// file offset in a container
uint32_t FileSize;	  /// Size
uint32_t zFileSize;	 /// compressed file size
uint32_t zFileSizeAl;   /// compressed file size aligned
uint8_t FileFlags;	  /// Flags file
int32_t Cycle;		  /// Cycle (used for encrypted files)
};
typedef std::list <_FileNode> _FilesList;


int main()
{
/// Some declarations
FILE *FD = NULL;
struct grf_header Header;
uint32_t RealFilesCount = 0;
uint8_t * pBuffer = NULL, * pZBuffer = NULL;
uint32_t TableSize = 0, zTableSize = 0;
_FilesList FilesList;

FD = fopen("naoro.grf", "rb");
fread(&Header, GRF_HEADER_SIZE, 1, FD);

if ( strncmp(Header.Magic, GRF_HEADER, 16) )
	 return 0;

/// Now the structure is stored Header informations about current container
/// And can easily access them

/// The variable is now RealFilesCount the actual number of files in a container
/// On this can start reading the information about files
RealFilesCount = Header.FilesCount - Header.Seed - 7;

/// Move the file pointer at the beginning of the file table
fseek(FD, Header.FileTableOffset + GRF_HEADER_SIZE, SEEK_SET);

/// Read compressed and the actual size of the MFT
if ( !fread (&zTableSize, 4, 1, FD) || !fread (&TableSize, 4, 1, FD) )
{
	return 0;
}

/// Allocate the necessary memory volume and read the file table
pBuffer = new uint8_t [TableSize]; pZBuffer = new uint8_t [zTableSize];
if( !fread (pZBuffer, zTableSize, 1, FD) )
{
	delete [] pBuffer, delete [] pZBuffer;
	return 0;
}
fclose(FD);

/// Extract the file table
/// If you want to use the code presented here will have to connect the library zlib
/// This function is part of GrfLib for KPatcher
/// The variable pBuffer now stored unpacked and ready to read the file table
if ( uncompress((Bytef*)pBuffer, (uLongf*)&TableSize, (Bytef*)pZBuffer, zTableSize) != Z_OK )
{
	delete [] pBuffer, delete [] pZBuffer;
	return 0;
}
delete [] pZBuffer;

for ( uint32_t Offset = 0; Offset < TableSize; )
{
	size_t FN_Size = strlen((char*)(pBuffer+Offset));
	if ( FN_Size >= 0x100 )
	{
		delete[] pBuffer;
		return 0;
	}

	grf_fentry FileEntry = {0};
	/// Get a pointer to the file name
	char *FileName = (char*)(pBuffer+Offset);
	Offset += FN_Size + 1;
	/// Get the file information
	memcpy(&FileEntry, (pBuffer+Offset), GRF_TABLE_SIZE);
	Offset += GRF_TABLE_SIZE;

	/// Skip the directories and files whose size is equal to 0
	if ( !(FileEntry.Flags&GRF_FLAG_FILE) || FileEntry.Size == 0 )
		continue;

	/// Fill the structure with the file information
	_FileNode Node;
	Node.FileName.append(FileName, FN_Size);
	Node.FileFlags = FileEntry.Flags;
	Node.NameHash = crc32(0, (Bytef*)FileName, FN_Size);
	Node.FileOffset = FileEntry.Offset;
	Node.FileSize = FileEntry.Size;
	Node.zFileSize = FileEntry.zSize;
	Node.zFileSizeAl = FileEntry.zSizeAl;
	Node.Cycle = -1;

	/// Get the information needed to decrypt the file
	if ( Node.FileFlags&GRF_FLAG_MIXCRYPT )
	{
		Node.Cycle = 1;
		for( uint32_t i = 10; Node.zFileSize >= i; i = i*10 )
			Node.Cycle++;
	}
	if ( Node.FileFlags&GRF_FLAG_DES )
	{
		Node.Cycle = 0;
	}

	/// Add all the information on file in the repository.
	FilesList.push_back(Node);
}
delete[] pBuffer;

/// Creating empty file
FD = fopen("files_list.txt", "w+");

_FilesList::iterator itr = FilesList.begin();
_FilesList::iterator itr_end = FilesList.end();

/// Fill the newly created file data.
fprintf(FD, "FileName - FileSize - FilePos\n");
for ( ; itr != itr_end; itr++)
	fprintf(FD, "%s - %d - %d\n", itr->FileName.c_str(), itr->FileSize, itr->FileOffset+GRF_HEADER_SIZE);
fclose(FD);

return 0;
}