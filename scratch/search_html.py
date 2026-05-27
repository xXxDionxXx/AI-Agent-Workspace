with open('creator/milanote_board_clip_01.html', 'r', encoding='utf-8') as f:
    content = f.read()

has_str = 'storyboard1-table' in content
print("Contains storyboard1-table:", has_str)
if has_str:
    # Print occurrences
    idx = 0
    while True:
        pos = content.find('storyboard1-table', idx)
        if pos == -1:
            break
        print(f"Found at position: {pos}")
        idx = pos + 1
