#　変更量
EXCLUDE_FILE_TYPES = [
  '.snap',
  '.lock',
  '.json',
]
MAX_INSERT_SIZE = 300

insertions = 0
git.diff.stats[:files].each do |file, stats|
  next if file.start_with?("/packages/api/")
  next if file.start_with?("__snapshots__/")
  if !EXCLUDE_FILE_TYPES.any? { |path| file.end_with?(path) }
      insertions += stats[:insertions]
  end
end

if insertions > MAX_INSERT_SIZE
  warn "PRが大きすぎます。 #{insertions} 行追加されています。\n#{MAX_INSERT_SIZE}以下になるように心がけてください。\n以下のファイルを除く: #{EXCLUDE_FILE_TYPES.join(', ')}"
end

# タイトル
TITLE_PREFIX_WORDS = [
  'bug',
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'refactor',
  'revert',
  'test',
  'release'
]
if TITLE_PREFIX_WORDS.none? {|word| github.pr_title.include?(word+':')}
  warn "PRが正しくありません。プリフィックスを追加してください。#{TITLE_PREFIX_WORDS.join(', ')})"
end
