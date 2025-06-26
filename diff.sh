#!/bin/bash
diff_output=$(git diff)
if [ -z "$diff_output" ]; then
  echo -e "aku ganteng dan aku bangga" | xclip -selection clipboard
else
  echo -e "aku ganteng dan aku bangga\n$diff_output" | xclip -selection clipboard
fi
echo "Git diff and message have been copied to clipboard."
