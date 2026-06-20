---
title: Whisper 全自动 LRC 歌词生成器使用说明
date: 2026-06-16 10:53:03
categories: 
  - 网站更新
  - 代码
tags: 代码
orderby: name
---

# 🎵 Whisper 全自动 LRC 歌词生成器使用说明

这是一个基于 OpenAI Whisper 语音识别模型的全自动歌词制作工具。你只需要把音频文件放进文件夹，运行脚本，它就能自动把音频转化为**无标点符号、带精准时间戳**的标准的 `.lrc` 歌词文件。

## 🛠️ 第一步：环境准备（只需配置一次）

在使用脚本之前，确保你的电脑已经安装了 **Python** 以及音视频解码器 **FFmpeg**。

### 1. 安装 Python 依赖库

打开终端（Terminal 或 MINGW64 / CMD），运行以下命令安装核心库：

Bash

```
pip install openai-whisper torch
```

### 2. 配置 FFmpeg（至关重要）

Whisper 必须依赖 FFmpeg 来读取 MP3/WAV 等音频。

- **Windows 用户**：下载并解压 FFmpeg 后，必须将其中的 `bin` 目录路径（例如 `C:\ffmpeg\bin`）添加到系统的**环境变量 (Path)** 中。
- *注意：配置好环境变量后，必须**重启**当前的终端窗口（或 VS Code），配置才会生效。*

## 📂 第二步：文件摆放

把下载好的 Python 脚本（假设命名为 `direct_lrc_gen.py`）和你**所有想要制作歌词的音频文件**放在同一个文件夹下。

**正确的目录结构示例：**

Plaintext

```
📁 我的音乐工厂/
│── direct_lrc_gen.py       <-- 你的 Python 脚本
│── 一枕秋山.mp3             <-- 歌曲 A
│── 晴天.wav                 <-- 歌曲 B (支持多种音频格式)
└── 那些年.m4a               <-- 歌曲 C
```

> 💡 **提示**：不需要准备任何 `.txt` 歌词文本，AI 会全自动听写。

## 🚀 第三步：运行脚本

1. 在当前文件夹下打开你的终端（如 MINGW64）。
2. 输入以下命令并回车：

Bash

```
python direct_lrc_gen.py
```

### ⚙️ 自动化运行流程：

1. **自动避坑**：脚本会自动注入补丁，防止出现 `libiomp5md.dll` 冲突导致的程序崩溃。
2. **首次运行**：会自动从网上下载 Whisper 语音模型（大约 140MB），下载完成后会自动开始处理。
3. **净化文字**：AI 听写出的歌词会自动过滤掉所有的逗号、句号、连字符等标点符号，只保留干净的文字和必要的空格。
4. **完美产出**：在同目录下直接吐出同名的 `.lrc` 文件。

## ⚙️ 第四步：进阶微调（根据需要修改代码）

如果你想调整识别效果，可以用文本编辑器打开 `direct_lrc_gen.py`，拉到代码**最底部**的配置区域进行修改：

Python

```
if __name__ == "__main__":
    # ==================== 配置区域 ====================
    TARGET_FOLDER = "."  # "." 代表当前文件夹。也可以改成绝对路径如 "D:/Music"
    MODEL_SIZE = "base"  # 👈 核心：可以在这里更换模型大小
    # ==================================================
```

### 💡 模型大小（MODEL_SIZE）更换指南：

- **`"base"`（默认）**：速度非常快，对配置要求低，应付普通国语歌曲绰绰有余。
- **`"small"` 或 `"medium"`**：如果发现歌曲中有**粤语、闽南语、纯正英文**，或者歌手吐字不清、出现繁体字错字，可以将这里改成 `"small"` 或 `"medium"`。模型越大，识别错别字的概率就越低，但运行速度会变慢。

## ❌ 常见问题与排查

- **报错：`FileNotFoundError: [Errno 2] No such file or directory: 'ffmpeg'`**
  - *原因*：系统找不到 FFmpeg。
  - *解决*：请检查环境变量是否配置正确，且配置后**必须重启**终端或命令行窗口。
- **生成的歌词里有繁体字怎么办？**
  - *解决*：Whisper 在识别某些吐字或歌曲时可能会吐出繁体，推荐将底部的 `MODEL_SIZE` 升级为 `"small"` 甚至 `"medium"`，更大的模型对简繁体的规范性更好。

```python
import os
import glob
# 🛠️ 留存补丁：解决你之前遇到的 libiomp5md.dll 冲突报错
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

import whisper

def format_time(seconds):
    """将秒数转化为 LRC 标准时间格式 [mm:ss.xx]"""
    minutes = int(seconds // 60)
    seconds_rem = seconds % 60
    secs = int(seconds_rem)
    centiseconds = int(round((seconds_rem - secs) * 100))
    
    if centiseconds == 100:
        secs += 1
        centiseconds = 0
    if secs == 60:
        minutes += 1
        secs = 0
    return f"[{minutes:02d}:{secs:02d}.{centiseconds:02d}]"

def remove_punctuation(text):
    """
    自动删去识别文本中的中英文标点符号，仅保留文字、数字和单个空格
    """
    cleaned = "".join([c for c in text if c.isalnum() or c.isspace()])
    return " ".join(cleaned.split())

def transcribe_audio_to_lrc(model, audio_path):
    """直接识别音频并导出为干净的无标点 LRC 文件"""
    output_lrc_path = os.path.splitext(audio_path)[0] + ".lrc"
    
    print(f" 🔍 正在语音识别中...")
    # 强制指定语言为中文
    result = model.transcribe(audio_path, language="zh")
    
    with open(output_lrc_path, "w", encoding="utf-8") as f:
        for segment in result['segments']:
            start_time = segment['start']
            raw_text = segment['text'].strip()
            
            # 自动过滤掉标点符号
            final_line = remove_punctuation(raw_text)
            
            # 确保这一行不是空的
            if final_line:
                timestamp = format_time(start_time)
                f.write(f"{timestamp}{final_line}\n")
                # 在终端实时打印当前识别进度
                print(f"{timestamp} {final_line}")
                
    print(f" ✅ 成功生成歌词: {output_lrc_path}\n")

def batch_process(folder_path, model_size="base"):
    """批量扫描文件夹下的所有音频"""
    audio_extensions = ["*.mp3", "*.wav", "*.flac", "*.m4a"]
    audio_files = []
    for ext in audio_extensions:
        audio_files.extend(glob.glob(os.path.join(folder_path, ext)))
        
    if not audio_files:
        print(f" ❌ 未在当前文件夹中找到任何音频文件。")
        return

    print(f"📂 发现 {len(audio_files)} 个音频文件，正在初始化 Whisper ({model_size}) 模型...")
    model = whisper.load_model(model_size)
    print("🚀 模型加载完成，开始全自动提取歌词...\n" + "="*40)

    success_count = 0
    for audio_path in audio_files:
        file_title = os.path.basename(audio_path)
        print(f"🎵 正在处理: {file_title}")
        try:
            transcribe_audio_to_lrc(model, audio_path)
            success_count += 1
        except Exception as e:
            print(f" ❌ 识别失败，错误原因: {e}\n")

    print("="*40 + f"\n🎉 处理结束！已直接生成 {success_count}/{len(audio_files)} 首歌曲的歌词文件。")

if __name__ == "__main__":
    # ==================== 配置区域 ====================
    TARGET_FOLDER = "."  # "." 代表扫描当前文件夹
    MODEL_SIZE = "base"   # 可以根据硬件改为 "small" 或 "medium" 提升繁体字和复杂吐字的准确率
    # ==================================================
    
    batch_process(TARGET_FOLDER, model_size=MODEL_SIZE)
```

