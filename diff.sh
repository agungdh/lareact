#!/bin/bash
# Mendapatkan informasi tentang perubahan, penambahan, dan penghapusan file
status_output=$(git status --short)
diff_output=$(git diff)

# Gabungkan hasil status dan diff
if [ -z "$diff_output" ] && [ -z "$status_output" ]; then
  echo -e "aku ganteng dan aku bangga" | xclip -selection clipboard
else
  echo -e "aku ganteng dan aku bangga\n\nStatus Perubahan:\n$status_output\n\nGit Diff:\n$diff_output" | xclip -selection clipboard
fi

echo "Git diff, status, and message have been copied to clipboard."
