require 'json'

# TODO: Replace our regexps by calls to Divine Pride,
#  it has access to better data somehow, such as detecting enchants that don't have descriptions telling what that is.
#
# Possibly move this to a Node script as well.
#

def int_matcher(name)
  [/#{name}:\s+\^\w{6}(\d+)/, Proc.new {|v| v.to_i }]
end

def text_matcher(name)
   [/#{name}:\s+\^\w{6}(.*?)\^/, Proc.new {|v| v}]
end

files = [
    {path: "./itemInfo.lub", encoding: "cp1252"},
    {path: "./iteminfo_new.lub", encoding: "utf-8"}
]

ID_MATCHER = /^\[(\d+)\]\s{0,}=\s{0,}\{.*$/im
NAME_MATCHER = /^identifiedDisplayName\s+=\s+\"(.*)\",.*$/im
DESCRIPTION_MATCHER = /^identifiedDescriptionName\s{0,}=\s{0,}\{$/im
BLOCK_END_MATCHER = /^\},?.*$/im
SLOT_MATCHER = /^slotCount\s{0,}=\s{0,}(\d+).*$/im
CLASS_NUM_MATCHER = /^ClassNum\s{0,}=\s{0,}(\d+).*$/im
COSTUME_MATCHER = /^costume\s{0,}=\s{0,}(false|true).*$/im

# Description Matchers
DESCRIPTION_FIELDS = {
  weight: int_matcher("Peso"),
  sub_type: text_matcher("Tipo"),
  location: text_matcher("(?:Equipa.*?|Posi[cç][aã]o)"),
  def: int_matcher("DEF"),
  atq: int_matcher("Ataque|ATQ"),
  atqm: int_matcher("ATQM"),
  defm: int_matcher("DEFM"),
  level: int_matcher("N[íi]vel\snecess[aá]rio"),
  weapon_level: int_matcher("N[íi]vel\s.*?arma"),
  jobs: text_matcher("Classes"),
}


items = {}

files.each do |file|
  puts file

  current_id = nil
  description_block = false

  File.readlines(file[:path], encoding: file[:encoding]).each do |line|
    line = line.strip.encode("utf-8")
    case line
    when ID_MATCHER
      current_id = $1
      items[current_id] ||= {
        name: nil,
        class_num: 0,
        description: "",
        costume: false,
      }

    when NAME_MATCHER
      items[current_id][:name] = $1

    when DESCRIPTION_MATCHER
      description_block = true
      items[current_id][:description] = ""

    when BLOCK_END_MATCHER
      if description_block
        description_block = false
      end

    when SLOT_MATCHER
      items[current_id][:slots_count] = $1.to_i
    when CLASS_NUM_MATCHER
      items[current_id][:class_num] = $1.to_i
    when COSTUME_MATCHER
      items[current_id][:costume] = $1 == "true"
    else
      if description_block
        desc = line.match(/^\"(.*)\".*$/)&.captures&.first
        items[current_id][:description] += desc + "\n"

        DESCRIPTION_FIELDS.each do |key, (matcher, fn)|
          value = desc.match(matcher)&.captures&.first
          if value
            value = fn.call(value.strip)
            items[current_id][key] = value
          end
        end
      end
    end
  end
end


File.open("raw_items.json", "w") do |f|
  f.write items.to_json
end
