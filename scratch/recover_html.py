import json

p = r"C:\Users\ASUS\.gemini\antigravity\brain\49550010-90b9-46dd-a49d-5727829b2fa0\.system_generated\logs\transcript.jsonl"
with open(p, 'r', encoding='utf-8') as f:
    lines = f.readlines()

longest_code = ""
longest_idx = -1
longest_type = ""

for idx, line in enumerate(lines):
    try:
        obj = json.loads(line)
        tool_calls = obj.get("tool_calls", [])
        for tc in tool_calls:
            name = tc.get("name") or tc.get("function", {}).get("name")
            args = tc.get("args") or tc.get("arguments")
            if isinstance(args, str):
                try:
                    args = json.loads(args)
                except:
                    pass
            if isinstance(args, dict):
                target = args.get("TargetFile") or args.get("Target")
                if target and "milanote_board_clip_01.html" in target:
                    code = args.get("CodeContent") or args.get("ReplacementContent")
                    if code and len(code) > len(longest_code):
                        longest_code = code
                        longest_idx = idx
                        longest_type = name

    except Exception as e:
        pass

print(f"Longest match at line {longest_idx+1}, type: {longest_type}, length: {len(longest_code)}")
if longest_code:
    with open("scratch/recovered_longest.html", "w", encoding="utf-8") as out:
        out.write(longest_code)
    print("Saved to scratch/recovered_longest.html")
