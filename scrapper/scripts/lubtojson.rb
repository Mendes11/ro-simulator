require 'json'

files = [
    {path: "./itemInfo.lub", encoding: "cp1252"},
    {path: "./iteminfo_new.lub"}
]

ID_MATCHER = /^\[(\d+)\]\s{0,}=\s{0,}\{.*$/
NAME_MATCHER = /^identifiedDisplayName\s+=\s+\"(.*)\",.*$/
DESCRIPTION_MATCHER = /^identifiedDescriptionName\s{0,}=\s{0,}\{$/
BLOCK_END_MATCHER = /^\},?.*$/
SLOT_MATCHER = /^slotCount\s{0,}=\s{0,}(\d+).*$/
CLASS_NUM_MATCHER = /^ClassNum\s{0,}=\s{0,}(\d+).*$/
COSTUME_MATCHER = /^costume\s{0,}=\s{0,}(false|true).*$/

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
        description_lines: [],
        slots_count: 0,
        class_num: 0,
        costume: false,
      }

    when NAME_MATCHER
      items[current_id][:name] = $1

    when DESCRIPTION_MATCHER
      description_block = true
      items[current_id][:description_lines] = []

    when BLOCK_END_MATCHER
      if description_block
        items[current_id][:description] = items[current_id][:description_lines].join("\n") unless current_id.nil?
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
        items[current_id][:description_lines] << desc
      end

    end

  end
end


File.open("raw_items.json", "w") do |f|
  f.write items.to_json
end
