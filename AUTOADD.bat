@echo off
:: 解决Windows终端中文乱码问题
chcp 65001 >nul

:: 切换到当前批处理文件所在的目录
cd /d "%~dp0"

echo 当前工作目录: %cd%
echo.

:: 提示输入 commit 信息

echo.
echo 正在通过 Git Bash 执行 ACP (Add -> Commit -> Push)...

:: 优先尝试寻找默认安装路径下的 Git Bash
if exist "C:\Program Files\Git\bin\bash.exe" (
    "C:\Program Files\Git\bin\bash.exe" -l -c "git add . && git commit -m update && git push"
) else (
    :: 如果不在默认路径，尝试调用环境变量中的 bash
    where bash >nul 2>nul
    if %errorlevel% equ 0 (
        bash -l -c "git add . && git commit -m update && git push"
    ) else (
        echo [提示] 未在默认路径找到 Git Bash，正在尝试直接使用系统 Git 执行...
        git add . && git commit -m update && git push
    )
)

echo 脚本执行完毕！
pause