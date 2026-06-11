---
title:  视频字幕提取文本汇总（繁简对照版）
date: 2026-06-01 20:53:03
type: '小软件'
orderby: name
order: 2
---

# 视频字幕提取文本汇总（繁简对照版）

为了写文的时候有一个原剧字幕对照，故编写一个小软件用于提取文本，该软件尚未成熟，有待进一步修改。

```python
import cv2
import tkinter as tk
from tkinter import filedialog, simpledialog, messagebox
from docx import Document  # 用于创建 Word 文档
from opencc import OpenCC  # 用于繁体转简体

def get_params_by_gui():
    """使用绝对安全的独立弹窗逻辑获取参数"""
    root_file = tk.Tk()
    root_file.withdraw()
    root_file.attributes('-topmost', True)
    
    video_path = filedialog.askopenfilename(
        title="[1/2] 请选择一个 MP4 视频文件", 
        filetypes=[("MP4 视频", "*.mp4")]
    )
    root_file.destroy()
    
    if not video_path:
        return None, None

   root_num = tk.Tk()
​    root_num.withdraw()
​    root_num.attributes('-topmost', True)
​    
​    raw_input = simpledialog.askstring(
​        "区块阈值设置 [2/2]",
​        "请输入字幕占屏幕下方的百分比阈值：\n(建议输入 15 到 25 之间的数字，例如 20 代表扫描底部 20% 区域)",
​        initialvalue="20"
​    )
​    root_num.destroy()

​    if not raw_input:
​        return None, None
​        
​    try:
​        threshold = float(raw_input.strip().replace("%", ""))
​        if 0 < threshold <= 100:
​            return video_path, threshold
​    except ValueError:
​        pass
​        
​    return None, None

def format_time(milliseconds):
    """将毫秒数转换为标准时间格式 (HH:MM:SS,mmm)"""
    hours = int(milliseconds / 3600000)
    minutes = int((milliseconds % 3600000) / 60000)
    seconds = int((milliseconds % 60000) / 1000)
    ms = int(milliseconds % 1000)
    return f"{hours:02d}:{minutes:02d}:{seconds:02d},{ms:03d}"

def save_to_word_dual_language(srt_entries, output_docx_path):
    """【已升级】：将提取到的字幕以繁简双行对照的形式漂亮地保存至 Word"""
    doc = Document()
    
    # 初始化 OpenCC，'t2s' 代表繁转简
​    cc = OpenCC('t2s')
​    
    # 添加文档大标题
​    doc.add_heading('视频字幕提取文本汇总（繁简对照版）', level=0)
​    doc.add_paragraph('算法机制：基于高精度物理帧追踪，严格卡位文本存续的最后一帧。')
​    
    # 使用标准的短横线作为排版分割线
​    p_line = doc.add_paragraph()
​    p_line.add_run("____________________________________________________")
​    
    # 遍历写入字幕内容（包含完整的序号和最后一帧时间戳）
​    for idx, (start, end, text) in enumerate(srt_entries, 1):
​        traditional_text = text.strip()
​        if traditional_text:
            # 动态生成简体文本
​            simplified_text = cc.convert(traditional_text)
​            
​            p = doc.add_paragraph()
            # 1. 写入序号和时间轴（加粗）
​            p.add_run(f"[{idx}] {start} --> {end}\n").bold = True
            # 2. 写入原始繁体行
​            p.add_run(f"【繁】{traditional_text}\n")
            # 3. 写入洗干净的简体行
​            p.add_run(f"【简】{simplified_text}\n")
​            
​    try:
​        doc.save(output_docx_path)
​    except PermissionError:
​        print("\n❌ 错误：无法写入 Word 文件！请先关闭电脑上已经打开的同名 Word 文档，然后重新运行。")
​        messagebox.showerror("写入失败", "无法写入 Word 文件！\n请先关闭电脑上正在阅读的同名 Word 文档，然后重新运行。")

def extract_subtitles_to_docx_only(video_path, threshold_percent):
    """使用 EasyOCR 核心识别繁体，精准捕获最后一帧并独家导出 Word 文档"""
    print("\n[1/2] 正在加载 EasyOCR 繁体中文引擎...")
    import easyocr

    # 支持繁体中文('ch_tra')与英文('en')
​    reader = easyocr.Reader(['ch_tra', 'en'], gpu=True)

​    print("[2/2] 正在读取视频流并分析分辨率...")
​    cap = cv2.VideoCapture(video_path)
​    if not cap.isOpened():
​        print("❌ 错误：无法打开视频文件，请检查路径。")
​        return

​    fps = cap.get(cv2.CAP_PROP_FPS)
​    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
​    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
​    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    # 计算单帧耗时（毫秒），用于最后一帧的物理补偿
​    frame_duration_ms = 1000.0 / fps

    # 像素级裁剪底部 ROI 区块位置
​    crop_y_start = int(height * (1 - threshold_percent / 100))

​    print(f"      ▶ 视频分辨率: {width}x{height} | FPS: {fps:.2f}")
​    print(f"      ▶ 严格定位区间: 屏幕底部 Y 轴 [{crop_y_start} ➔ {height}] 像素区域")

    # 使用超稳的 0.15 秒精细采样率
​    frame_interval = max(1, int(fps * 0.15))

​    srt_entries = []
​    
    # 精密状态机变量
​    current_text = ""
​    start_time_ms = 0.0
​    last_seen_time_ms = 0.0  # 记录当前这段字幕最后一次被目击的物理帧时间

​    frame_count = 0
​    print("\n🚀 引擎就绪！正在严格追踪每句繁体字幕停留的最后一帧...")

​    while True:
​        ret, frame = cap.read()
​        if not ret:
​            break

​        if frame_count % frame_interval == 0:
​            current_ms = cap.get(cv2.CAP_PROP_POS_MSEC)

            # 严格截取限定位置的图像
​            cropped_zone = frame[crop_y_start:height, 0:width]

            # 运行 EasyOCR 识别
​            result = reader.readtext(cropped_zone, detail=0)
​            ocr_text = " ".join([line.strip() for line in result]) if result else ""

            # 核心状态机机制：文本发生改变
​            if ocr_text != current_text:
​                if current_text:
                    # 【精准卡点】：结束时间 = 上一次成功看到该字幕的时间 + 一帧的时长补偿
​                    end_time_ms = last_seen_time_ms + frame_duration_ms
​                    srt_entries.append((
​                        format_time(start_time_ms),
​                        format_time(end_time_ms),
​                        current_text
​                    ))
​                
​                current_text = ocr_text
​                start_time_ms = current_ms
​                last_seen_time_ms = current_ms
​            else:
​                if current_text:
​                    last_seen_time_ms = current_ms

​            progress = (frame_count / total_frames) * 100
​            print(f"\r      ⏳ 精准卡点进度: {progress:.2f}% | 正在提取 Y:[{crop_y_start}-{height}]", end="", flush=True)

​        frame_count += 1

    # 闭合片尾最后一句字幕
​    if current_text:
​        end_time_ms = last_seen_time_ms + frame_duration_ms
​        srt_entries.append((
​            format_time(start_time_ms),
​            format_time(end_time_ms),
​            current_text
​        ))

​    cap.release()
​    print("\n\n🎬 全片物理帧捕捉完毕！正在生成繁简对照并写入 Word 文件...")

    # 导出包含繁简双语对照的 Word 文档 (.docx)
​    output_docx_path = os.path.splitext(video_path)[0] + ".docx"
​    save_to_word_dual_language(srt_entries, output_docx_path)

​    print(f"🎉 大成功！字幕对照稿已完美记录在视频同目录下：")
​    print(f"👉 终产物繁简对照 Word 文档: {output_docx_path}\n")

if __name__ == "__main__":
    video_file, threshold_val = get_params_by_gui()

​    if video_file and threshold_val:
​        extract_subtitles_to_docx_only(video_file, threshold_val)
​    else:
​        print("❌ 未能成功获取文件或数字参数，程序退出。") ```
```

# 一些说明

欢迎使用本系统！本软件是一款集成了 **工业级 $ONNXRuntime $超导加速引擎** 的高精度多任务批处理工具，支持视频字幕的智能提取以及 Word 文档的排版级简繁互译。

软件采用纯本地绿色架构，**无需安装任何 Python 编程环境或第三方插件**，解压即可直接使用。

## ⚠️ 运行前必读（新手铁律）

> **1. 先解压，再运行！**
>
> 收到压缩包后，**请勿**直接在压缩包内部双击软件！请务必先点击右键，选择 **“解压到当前文件夹”**，然后进入解压后的普通文件夹内，双击 `SubtitleApp.exe` 启动。
>
> **2. 首次启动请稍候**
>
> 软件首次双击启动时，后台会自动配置并激活 ONNX 极速推理内核（耗时约 3~5 秒）。当下方黑色日志面板显示 `【系统提示】ONNX 极速推理引擎加载成功！` 后，即可开始完美体验。

## 🛠️ 核心功能操作指南

### 板块一：视频字幕高精批量提取工具

该工具能够自动识别视频底部的字幕帧，并将其严格卡位、汇总输出为排版精美的 Word 文稿。

1. **添加视频**：点击右侧的 `➕ 添加视频` 按钮，可单选或按住 `Ctrl` 键**一次性多选**多个 MP4 视频。选中的视频将纵向罗列在待处理列表中。
2. **队列管理**：
   - 如果不小心选错了某个视频，在列表中单击选中它，点击 `➖ 删除选中` 即可将其剔除。
   - 点击 `❌ 清空全部` 可一键清空当前的视频排队队列。
3. **参数配置**：
   - **文稿保存位置**：默认状态下，软件会自动将生成的 Word 文稿存放在**原视频文件的同级目录下**。如果您想统一存放到特定地方（如桌面、D盘），点击 `浏览...` 选取文件夹即可；点击 `重置` 可恢复默认。
   - **字幕扫描底部占比**：用于锁定视频字幕所在的高度区域。默认推荐 `15`。如果字幕偏高，可适当调大滑块。**区域越精准，扫描速度越快。**
   - **保留时间戳**：**（核心开关）** 勾选时，Word 文稿会严格带有时间轴标记（如 `[1] 00:00:12 --> 00:00:15`）；**取消勾选时，将自动隐去时间轴，直接为您输出一篇干净纯粹、适合阅读的纯文字稿！**
   - **繁简模式**：支持“繁简对照”、“纯简体”、“纯繁体”三种文稿输出格式。
4. **一键提取**：点击最下方的绿色大按钮，系统将激活**智能像素帧差闪避算法**（自动跳过没有字幕变化的画面），进入超导极速批量提取。提取结束后，系统会弹窗提示并**询问是否直接打开**生成的 Word 文稿。

### 板块二：独立 Word 文档（.docx）批量简繁互译工具

该工具可在**百分之百保留原有字体颜色、字号、加粗、表格排版格式**的前提下，实现大批量 Word 文档的高清简繁体对调。

1. **添加文档**：点击 `➕ 添加文档` 按钮，批量选中需要转换的 `.docx` 格式 Word 文件。
2. **选择翻译模式**：
   - **繁体中文 ➔ 简体中文**：适合将港台/海外文献、外挂繁体字幕文稿转化为规范的内地简体字。
   - **简体中文 ➔ 繁体中文**：适合商务、海外报表对接。
3. **一键转换**：点击粉红色大按钮，系统将自动对队列中的所有 Word 进行拓扑结构深度清洗。
4. **安全输出**：转换后的文件会自动遵循命名规则，另存为 `[原文件名]_简体版.docx` 或 `[原文件名]_繁体版.docx` 并保存在各自的原目录下，**绝对不会破坏或覆盖您的任何一份原始文件**。

## 📄 视觉排版美化标准（新版特性）

本版本对输出的 Word 文稿进行了深度的美化升级，生成的文件更具高级感：

- **大标题**：采用小二号（18pt）加粗**微软雅黑**字体，搭配主题高端蓝，端庄现代。
- **说明栏**：采用小四号深灰色**文雅楷体**，详细记录来源。
- **时间轴**：采用五号加粗 **Arial** 英文字体，数字排版紧凑高级，呈现多媒体专业格式。
- **文稿正文**：采用五号炭黑色**微软雅黑**，搭配美学 **1.25 倍行间距**，结构舒展，极其适合肉眼长时间阅读与二次校对。

## ❓ 常见问题与写保护排雷

> **Q：点击开始后，日志提示“写入冲突”或“PermissionError”怎么办？**
>
> **A**：这是因为被处理的同名 Word 文件此时正被您电脑上的 Microsoft Word 或 WPS Office 打开占用着。请前往任务栏**关闭对应的 Word 窗口**，然后重新点击运行即可。
>
> **Q：视频提取到中途，进度条不动了，软件卡死了吗？**
>
> **A**：没有卡死。因为启用了 ONNX 硬件级指令集加速和帧差检测，遇到视频中长时间没有人说话、画面字幕没有变化时，软件会自动进入“闪避跳帧状态”以节约算力，这属于正常现象。
>
> **Q：为什么软件无法读取某些视频？**
>
> **A**：本系统原生针对标准的 `.mp4` 格式视频进行了底层硬解优化。如果是 `.mkv`、`.avi` 或 `.mov` 等格式，建议先使用格式工厂等转换工具转化为标准的 `.mp4` 格式再添加进软件。