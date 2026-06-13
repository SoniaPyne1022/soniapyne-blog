---
title: 原核基因表达
date: 2026-05-25 12:10:00
categories: [学习手册,生物学,分子生物学] 
tags: 分子生物学
orderby: time
cover: /img/ScreenShot_2026-06-13_195949_058.png
---
分子生物学

第七章知识点总结


```latex
\chapter{原核基因表达}

\section{原核基因表达调控总论}
\redbf{组成型(constitutive)合成蛋白}:
数量稳定，合成速率不受环境或代谢状态的影响

\redbf{适应型/调节型(adaptive or regulated)合成蛋白}:合成速度和总量都随着环境的变化而改变

\subsection{原核基因表达调控总论}
\redbf{基因表达}(gene expression):DNA分子将其所承载的遗传信息，有序地通过密码子-反密码子系统，转变成蛋白质分子，执行各种生理生化功能，完成生命的全过程。

\redbf{基因表达调控}(gene regulation /gene control):对基因表达过程的调节称为基因表达调控。

原核生物中，\redbf{营养状况(nutritional status)和环境因素(environmental factor)}对基因表达起着举足轻重的作用。

真核生物尤其是高等真核生物中，\redbf{激素水平(hormone level)和发育阶段(developmental stage)}是调控基因表达的最主要因素。
\begin{figure}[H]
    \centering
    \includegraphics[width=0.96\textwidth]{img/真核与原核生物转录及翻译调控的总体特征比较.png} % 替换为你的图片文件名
    \caption{真核与原核生物转录及翻译调控的总体特征比较}
    \label{fig:comparison}
\end{figure}
\subsubsection{原核基因表达调控分类}
原核生物的基因表达调控主要发生在转录水平上
\begin{itemize}
    \item 负转录调控:\redbf{阻遏蛋白(repressor)}，阻止结构基因转录
    \begin{itemize}
        \item 负控阻遏系统
        \item 负控诱导系统
    \end{itemize}
    \item 正转录调控:\redbf{激活蛋白(activator)}
    \begin{itemize}
        \item 正控诱导系统
        \item 正控阻遏系统
    \end{itemize}
\end{itemize}
\subsubsection{原核基因表达调控的主要特点}
\begin{enumerate}
    \item \redbf{操纵子的调控}
    \begin{itemize}
        \item 乳糖操纵子
        \item 色氨酸操纵子
    \end{itemize}
    \item \redbf{转录起始的调控}
    \begin{itemize}
        \item 核心酶
        \item $\sigma$因子
    \end{itemize}
    \item \redbf{转录终止阶段的调控}
    \begin{itemize}
        \item 抗终止作用
        \item 弱化作用
    \end{itemize}
    \item \redbf{转录后调控}
    \begin{itemize}
        \item mRNA自身结构对翻译的调节
        \item 反义RNA对翻译的调控
        \item 翻译阻遏
    \end{itemize}
\end{enumerate}
\section{乳糖操纵子与负控诱导系统【重要】}
\redbf{操纵子}:是原核生物在分子水平上基因表达调控的单位，由\redbf{启动子、操纵基因}及其所控制的一组功能上相关的\redbf{结构基因}所组成。操纵基因受调节基因产物的控制。

操纵子可视为原核生物的转录单位，它可以逐个地从原核生物基因组中分离出来，对其结构功能加以研究。

\begin{kaobox}
乳糖操纵子：
\begin{itemize}
    \item 大肠杆菌乳糖操纵子(lactose operon)包括3个\redbf{结构基因}:\redbf{Z、Y和A}，以及\redbf{启动子(P)、控制子(O)和阻遏子}等。
    \item \redbf{Z编码$\beta$-半乳糖苷酶，Y编码$\beta$-半乳糖苷透过酶，A编码$\beta$-半乳糖苷乙酰基转移酶。}
    \item 转录的调控是在\redbf{启动区和操纵区}进行的。
\end{itemize}
\end{kaobox}
\subsection{酶的诱导——lac体系受调控的证据}
在\redbf{不含乳糖的培养基}中，每个大肠杆菌细胞内大:约只有1-2个利用乳糖的酶分子($\beta$-半乳糖苷酶和透过酶)。如果在培养基中加入乳糖，利用乳糖的酶浓度很快达到细胞总蛋白量的6\%或7\%，每个细。胞中可有超过10$^5$个酶分子。由底物诱导合成利用该底物的酶，这种现象称为\redbf{酶的诱导}。

\redbf{实验室常用安慰诱导剂(乳糖类似物)}:异丙基-1-硫-β-D-半乳糖苷(IPTG)，它能诱导酶的合成，但不能被酶分解。

\subsubsection{同位素示踪试验}
同位素示踪实验:把大肠杆菌放在加有放射性\redbf{$^{35}$S标记的氨基酸}，但\redbf{没有半乳糖}诱导物的培养基中繁殖几代。再将这些带有放射活性的细菌转移到\redbf{不含$^{35}$S(无放射性)的培养基}中，随着培养基中诱导物的加入，β-半乳糖苷酶便开始合成。分离-半乳糖苷酶，发现这种酶无$^{35}$S标记，说明\redbf{诱导物的作用是诱导新酶合成}，而不是将已存在于细胞中的酶前体转化成有活性的酶。
\subsection{操纵子模型及其影响因子}
\begin{kaobox}
    乳糖操纵子的控制模型，其主要内容如下:
\begin{itemize}
    \item Z、Y、A基因的产物由同一条多顺反子的mRNA基因所编码。
    \item 这个mRNA分子的启动子紧接着操纵基因区(O)，而位于I与O之间的启动子区(P)，不能单独启动下游mRNA分子的转录。
    \item 操纵基因区(O)是DNA上的一小段序列(仅为26bp)，是阻遏物的结合位点。
    \item 当阻遏物与操纵基因结合时，lacmRNA的转录起始受到抑制。
    \item 诱导物通过与阻遏物结合，改变它的三维构象，使之不能与操纵基因结合，从而激发lacmRNA的合成。当有诱导物存在时，操纵基因区没有被阻遏物占据，所以启动子能够顺利起始mRNA的合成。
\end{itemize}
研究发现真正的诱导物是\redbf{乳糖的异构体}

\redbf{异构乳糖/别乳糖(葡萄糖-1,6-半乳糖)};是在$\beta$-半乳糖苷酶的催化下由乳糖形成\redbf{异构乳糖}。
\end{kaobox}
\subsubsection{lac操纵子的本底水平表达}
研究发现真正的诱导物是乳糖的异构体\redbf{异构乳糖/别乳糖(葡萄糖-1,6-半乳糖)}，而后者是在$\beta$-半乳糖苷酶的催化下由乳糖形成的。在非诱导状态下有少量的lac mRNA合成(每个世代中有1~5个mRNA分子)，这种合成被称之为\redbf{本底水平的合成}。

\subsubsection{大肠杆菌对乳糖的反应}
当底物添加乳糖时，本底水平\redbf{透过酶}的存在，使少量乳糖分子进入细胞转变成\redbf{异构乳糖}。
\redbf{异构乳糖}结合阻遏物使之离开操纵区，开始了lacmRNA的生物合成，导致乳糖大量涌入细胞。

乳糖都被消耗完毕(\redbf{无乳糖})，由于阻遏物仍在不断地被合成，有活性的阻遏物浓度将超过异构乳糖的浓度，使细胞重新建立起阻遏状态，\redbf{导致lac mRNA合成被抑制}。
如果在原有的乳糖被撤去之后的一个世代中再加入乳糖，这时乳糖可以立即开始降解，因为此时细胞内仍有一定浓度的透过酶和β-半乳糖苷酶。\redbf{大量进入细胞的乳糖大多数被降解成为葡萄糖和半乳糖，但还有许多乳糖被转变成异构乳糖参与调解。}

\subsubsection{阻遏lac I-基因产物及功能}

\begin{itemize}
    \item \redbf{N端}:HTH(helix-turn-helix)DNA结合结构域；
    \item \redbf{核心结构域}:形成二聚体，诱导物结合；
    \item \redbf{C端}:一个a螺旋结构，参与阻遏蛋白的聚合形成四聚体。
    \item 细胞中不存在诱导物(异构乳糖)时，阻遏物通过二聚体的两个HTH结构域特异性地结合在lac操纵区中一段21bp的DNA序列上，阻止RNA聚合酶与lac操纵子启动子区的结合，抑制lacmRNA的转录。
\end{itemize}

一旦细胞中乳糖水平提高，异构乳糖数量增加，有效结合到阻遏蛋白的核心结构域，引起阻遏蛋白的构象改变，与DNA结合的特异性降低，阻遏蛋白不再特异性结合lac操纵区而是随机与DNA的任意区域相结合。\redbf{lac操纵子的转录起始区暴露并被RNA聚合酶结合，激活lac mRNA的转录。}

当乳糖耗尽，诱导物异构乳糖减少，失去诱导物的阻遏蛋白会重新特异性结合lac操纵区，阻止基因转录。

当lacI基因由弱启动子突变成强启动子，细胞内就不可能产生足够的诱导物来克服阻遏状态，因此在这些突变体中，整个lac操纵子就不可诱导(\redbf{弱启动子})
\subsubsection{ cAMP与代谢物激活蛋白—乳糖操纵子的正调控}
实验发现:当大肠杆菌以乳糖为唯一碳原时，lac操纵子可被乳糖诱导而表达，可是在培养基中同时加入葡萄糖时，细菌优先利用葡萄糖，只有葡萄糖耗尽时，乳糖才能诱导基因的表达，这种现象称为\redbf{分解物阻遏/代谢物阻遏}。

环磷酸腺苷，cAMP

\redbf{葡萄糖效应}:是指当葡萄糖和其它糖类一起作为细菌的碳源时葡萄糖总是优先被利用，葡萄糖的存在阻止了其它糖类利用的现象。

\redbf{原因}:细菌在富含葡萄糖的培养基上生长的时，\redbf{葡萄糖}可降低细菌体内、\redbf{cAMP}的水平。在大肠杆菌中，cAMP的浓度受到葡萄糖代谢的调节。

在含\redbf{葡萄糖}的培养基中，cAMP的浓度低；但培养基中只有甘油或乳糖，cAMP的浓度会很高，推测糖酵解途径中某些代谢产物是腺苷酸环化酶(将ATP转变成cAMP)活性抑制剂。

CAP分子内有DNA结合区及cAMP结合位点，是一个\redbf{正调控因子}，生化和遗传学实验证明，CAP可以结合到启动子的某个部位而激活操纵子的转录。

cAMP 与CAP结合形成\redbf{二聚体}共同发挥作用。

只有cAMP存在时，CAP才有活性。

RNA聚合酶a亚基的C端结构域(aCTD)可以结合CAP位点，并与CAP位点附近的DNA结合。通过与aCTD的相互作用，\redbf{cAMP-CRP复合物}帮助RNA聚合酶结合到启动子区域，激活lacmRNA的转录。

半乳糖、麦芽糖、阿拉伯糖、山梨醇等在降解过程中有葡萄糖存在时，操纵子就不表达，称为\redbf{降解物敏感型操纵子}。

在lac操纵元的启动子P上游有一段与P部分重叠的序列，能与CAP特异结合，称为\redbf{CAP结合位点}。

\begin{itemize}
    \item 位置:lac操纵子上的CAP位点位于转录起始位点上游约60bp处，紧邻RNA聚合酶所结合的启动子区。
    \item 作用:CAP与这段序列结合时，可增强RNA聚合酶的转录活性50倍。当有葡萄糖可供分解利用时，cAMP浓度降低，CRP不能被活化，lac操纵子的结构基因表达下降。
\end{itemize}
\subsubsection{葡萄糖对lac操纵子的调控}
\begin{figure}[H]
    \centering
    \includegraphics[width=0.96\textwidth]{img/葡萄糖抑制了lac操纵子基因的表达.png} % 替换为你的图片文件名
    \caption{葡萄糖抑制了lac操纵子基因的表达}
    \label{fig:glucose_repression}
\end{figure}
当葡萄糖和乳糖同时存在时，lac启动子表达受阻，没有β-半乳糖苷酶活性；当葡萄糖消耗完以后(箭头处)，cAMP浓度增加，$\beta$-半乳糖苷酶活性增加，细胞又恢复分裂

\subsection{lac 操纵子DNA 的调控区域——P、O 区}
\redbf{P区(即启动子区)}一般是从I基因结束到mRNA转录起始位点下游5～10 bp。

\redbf{O 区(即阻遏物结合区)}位于−7～+28 位。

cAMP参与的正调节作用机制
\begin{itemize}
    \item \redbf{P$_{lac}$是弱启动子}，仅由乳糖的存在发生去阻遏使lac操纵子转录开放，必需同时有CAP来加强转录活性，细菌才能合成足够的酶来利用乳糖。
    \item 细胞内cAMP与CRP/CAP形成的二聚体复合物是启动lac转录的\redbf{必要条件}。
    \item 葡萄糖的存在降低了细胞内cAMP的含量，所以葡萄糖存在时，不能形成复合物，抑制乳糖操纵子的表达。
    \item lac操纵子的强诱导需要既有乳糖的存在又要没有葡萄糖。
    \item 通过这一机制，细菌优先利用葡萄糖，只有无葡萄糖而有乳糖时，细菌才去充分利用乳糖。
    \item \redbf{结论:lac操纵子强的诱导作用既需要乳糖又需缺乏葡萄糖。}
\end{itemize}
\subsection{lac操纵子中的其他问题}
\subsubsection{lacA基因及其生理功能}
lacA基因存在于lac操纵子中，编码了\redbf{$\beta$-半乳糖苷乙酰基转移酶}。A基因的表达产物虽然在乳糖降
解中不起作用，但有实验发现，它抑制了$\beta$-半乳
糖苷酶产物的有害性衍生物在细胞内积累，在生
物进化中是有意义的。
\subsubsection{lac基因数量上的比较}
在一个完全被诱导的细胞中，β-半乳糖苷酶、透过酶及乙酰基
转移酶的拷贝数比例为\redbf{1∶0.5∶0.2}。酶数量上的差异是由于翻
译水平上两种方式调节所致。
\begin{itemize}
    \item 在lac mRNA分子内部，A基因比Z基因更易受内切酶作用发
生降解，因此，Z基因的完整拷贝数要比A 基因多。
    \item lac mRNA可能与翻译过程中的核糖体相脱离，从而终止蛋白质链的翻译。因此，就存在着\redbf{一个从mRNA的5′ 端到3′ 端的蛋白质合成梯度}。事实上，多顺反子操纵子mRNA所编码的各种蛋白质的相对浓度都由每一个顺反子的翻译频率所决定。
\end{itemize}
\redbf{lac操纵子强的诱导作用既需要乳糖又需缺乏葡萄糖。}

细菌中的转录调控体系
\begin{itemize}
    \item \redbf{负控诱导系统}:阻遏蛋白不与效应物(诱导物)结合时，结构基因不转录
    \item \redbf{正控诱导系统}:效应物分子(诱导物)的存在使激活蛋白处于活性状态
    \item \redbf{负控阻遏系统}:阻遏蛋白与效应物结合时，结构基因不转录
    \item \redbf{正控阻遏系统}:效应物分子的存在使激活蛋白处于非活性状态
\end{itemize}

\section{色氨酸操纵子与负控阻遏系统}
trp体系参与\redbf{生物合成}而不是降解，它不受葡萄糖或cAMP-CRP的调控。
色氨酸操纵子(tryptophane operon)负责色氨酸的生物合成，当培养基中有足够的色氨酸时，这个操纵子自动关闭，缺乏色氨酸时操纵子被打开，其结构基因表达，为\redbf{可阻遏}的操纵子模型。

Trp基因簇编码蛋白产物

\begin{itemize}
    \item trpE和trpG编码邻氨基苯甲酸合酶，trpD编码邻氨基苯甲酸磷酸核糖转移酶，trpF编码异构酶，trpC编码吲哚甘油磷酸合酶，trpA和trpB则分别编码色氨酸合酶的a和β亚基。
    \item 研究发现，在大肠杆菌等许多细菌中，trpE和trpG融合成一个功能基因，trpC和trpB也融合成一个基因，产生具有双重功能的蛋白质。
    \item 细菌中的pabA和pabB基因分别编码ADC合酶的两个亚基，pabC基因编码ADC裂解酶，ubiC基因编码分枝酸裂解酶，eniC基因编码异构分枝酸合酶。
    \item 这些基因产物都在不同程度上参与了分枝酸代谢，与色氨酸合成有一定关系。
\end{itemize}
\subsection{trp操纵子的阻遏系统}
trpR基因突变常引起trpmRNA的组成型合成，该基因产物因此被称为\redbf{辅阻遏蛋白(aporepressor)}。

此蛋白平常\redbf{不与}操纵区相结合。研究发现，这个系统中的效应物分子是色氨酸，是由trp操纵子所编码的生物合成途径的\redbf{末端终产物}。

当培养基中有\redbf{色氨酸}时，该阻遏蛋白与色氨酸相结合形成有活性的阻遏物，与操纵区结合并关闭trp mRNA转录。
\subsection{trp操纵子中的弱化作用}
\redbf{阻遏——操纵机制}对色氨酸来说只是一个\redbf{一级开关}，主管转录是否启动，相当于trp操纵子的粗调开关。

\redbf{弱化作用}相当于\redbf{精细开关}，对氨基酸的生物合成进行精细调控并决定已经启动的转录是否继续下去。


弱化系统作为一个细微调控，是通过转录达到第一个结构基因之前的过早终止来实现的，细胞中\redbf{色氨酸}的浓度是实现过早终止的根本原因。

在trp mRNA 5’端trpE基因的起始密码前有一个长162bp的mRNA片段被称为\redbf{前导区}

细胞中\redbf{色氨酸的浓度}是实现过早终止的根本原因。因为转录终止发生在这一区域，并且这种终止是被调节的，这个区域就被称为\redbf{弱化子}。

\begin{kaobox}
    原核生物内在终止子有两个明显的结构特点：
    \begin{itemize}
        \item 终止位点上游一般存在一个富含GC碱基的反向重复序列(大约20个核苷酸)，由这段DNA转录产生的RNA容易形成发夹结构。
        \item 在终止位点前面有一段由4~8个A-T碱基对序列，其转录产物的3'端为寡聚U。
    \end{itemize}
\end{kaobox}
\redbf{lac操纵子强的诱导作用既需要乳糖又需缺乏葡萄糖。}
这个系统中的效应物分子是\redbf{色氨酸}，是由\redbf{trp操纵子}所编码的生
物合成途径的末端终产物。
\subsubsection{前导肽}
各种实验表明弱化作用需要负载RNA$^{Trp}$参与，这意味着前导序列的某些部分被翻译了。

分析前导序列发现，它包括起始密码子AUG和终止密码子UGA;如果翻译起始于AUG，应该产生一个含有14个氨基酸的多肽。这个假设的多肽(还:未实际观察到)被称为\redbf{前导肽}

当mRNA合成起始以后，如果培养基中\redbf{有色氨酸}，转录总是在前导区终止，产生一个仅有140个核苷酸的RNA分子，终止trp基因转录。

前导区序列具有一个非常有意义的特点，在其第10和第11位上\redbf{有相邻的两个色氨酸密码子}

\subsubsection{弱化子的作用机制}
\begin{itemize}
    \item 弱化子对基因活性的影响是\redbf{通过影响前导序列mRNA的结构而起作用的}。
    \item 起调节作用的是某种\redbf{氨基酰-tRNA}的浓度。
    \item 属于这种调节方式的有大肠杆菌中的色氨酸操纵子、苯丙氨酸操纵子、苏氨酸操纵子、异亮氨酸操纵子等等。
\end{itemize}

\subsubsection{阻遏作用和弱化子的关系}
细菌通过弱化作用弥补阻遏作用的不足，因为阻遏作用只能使转录不起始，对于已经起始的转录，只能通过弱化作用使之中途停顿下来。

\redbf{阻遏作用的信号是细胞内色氨酸的多少，弱化作用的信号则是细胞内载有色氨酸的RNA的多少。}


\section{其他操纵子}
\subsection{半乳糖操纵子}
大肠杆菌半乳糖操纵子(galactose operon)在大肠杆菌遗传图上位于17cM处，包括3个结构基因:\redbf{异构酶}(UDP-galactose-4-epimerase,\redbf{galE})、\redbf{半乳糖-磷酸尿嘧啶核苷转移酶}(galactose transferase，\redbf{galT})、\redbf{半乳糖激酶}(galactose kinase,\redbf{galK})。

这3个酶的作用是使半乳糖变成葡糖-1-磷酸。

gal操纵子还有两个特点：
\begin{itemize}
    \item 它有两个\redbf{启动子}:其mRNA可从两个不同的起始点开始转录；
    \item 它有两个\redbf{O区}:一个在P区上游-67~-73，另一个在结构基因galE内部。
\end{itemize}
\subsubsection{ cAMP-CRP 对gal 启动子的作用}
有葡萄糖存在时，gal操纵子仍然可被诱导

从S$_1$起始的转录只有在培养基中\redbf{无葡萄糖}时才能顺利进行，RNA聚合酶与S$_1$的结合需要半乳糖、CRP和较高浓度的cAMP，cAMP-CRP能够刺激gal 操纵子转录。(利用$_1$转录，$_2$？)

体外转录研究发现cAMP-CRP抑制从S$_2$的转录而刺激从S$_1$的转录。当有cAMP-CRP时(\redbf{无葡萄糖})，转录从S$_1$开始，当无cAMP-CRP时(\redbf{有葡萄糖})，转录从S$_2$开始。

从S$_2$起始的转录则完全依赖于葡萄糖，高水平的cAMP-CRP能抑制由这个启动子起始的转录。

一般认为，cAMP-CRP有利于RNA聚合酶-S$_1$区复合物形成开链构象，从而起始基因转录。同时，\redbf{由于S$_1$和S$_2$区的核苷酸部分重叠，这一复合物的存在干扰了RNA聚合酶-S$_2$复合物的形成，抑制S$_2$起始的基因转录。}
\subsubsection{双启动子的生理功能}
半乳糖不仅可以作为唯一碳源供细胞生长，而且与之相关的物质——\redbf{尿苷二磷酸半乳糖}(UDPgal)是大肠杆菌细胞壁合成的前体，细胞必须随时合成差向异构酶，以保证尿苷二磷酸的供应。在没有外源半乳糖的情况下，细胞通过半乳糖差向异构酶(galE基因产物)的作用由UDP-葡萄糖合成UDPgal.

从必要性或经济性考虑，\redbf{都需要一个不依赖于cAMP-CRP的启动子(S$_2$)进行本底水平的组成型合成，另一个依赖于cAMP-CRP的启动子(S$_1$)对高水平合成进行调节。}
\subsection{二组分调控系统和信号转导}
较多情况下，外部信号并不是直接传递给调节蛋白，而是首先通过传感器(sensor)接收信号，然后以不同方式传到调节部位，这个过程就是\redbf{信号转导(signal transduction)}.

目前已知的最简单的细胞信号系统称为\redbf{二组分调控系统}(two-components systems).

二组分调控系统(two-components systems)，由两种不同的蛋白质组成:即位于细胞质膜上的\redbf{传感蛋白}(sensor protein)和位于细胞质中的应答调节蛋白
(response regulator protein)。

因传感蛋白具有激酶活性，所以又称\redbf{传感激酶}。传感激酶常在与膜外环境的信号反应过程中被磷酸化，再将其磷酸基团转移到应答调节蛋白。
\subsection{多启动子调控的操纵子}
\subsubsection{rRNA操纵子}
大肠杆菌rRNA操纵子(rrnE)上有两个启动子P$_1$和P$_2$。在对数生长期细菌中，P$_1$起始的转录产物比P$_2$起始的产物多3~5倍，所以P$_1$是强启动子。

但是当细菌处于\redbf{紧急状态}时，如氨基酸饥饿条件下，细胞中\redbf{ppGpp}浓度增加，\redbf{P$_1$}的作用被抑制。因为rRNA是细胞中蛋白质合成机器核糖体的重要组成部分，不能完全停止供应，由P$_2$起始的rrnE基因转录就显得越来越重要。在贫瘠的培养基中，\redbf{细胞增殖缓慢时}，P$_2$是合成rRNA的主要启动子。
\subsubsection{核糖体蛋白SI操纵子}
与rrnE操纵子类似的有核糖体蛋白SI操纵子(rpsA)，
它也受应急反应调节。

rpsA有4个启动子。\redbf{P$_1$和P$_2$}是强启动子，平时主要依靠它们来启动基因的表达，合成SI蛋白。\redbf{P$_3$和P$_4$}是弱启动子。只有在紧急情况下，\bluebf{P$_1$、P$_2$}启动子受ppGpp的抑制，由\bluebf{P$_3$、P$_4$}起始合成的SI蛋白维持了生命的最低需要。

\subsubsection{DnaQ蛋白操纵子}
DnaQ蛋白是DNA聚合酶全酶的亚基之一，其主要功能是校正DNA复制中可能出现的错误。

在染色体\bluebf{复制缓慢}时，RNA聚合酶活性较低，\bluebf{DnaQ蛋白的合成靠弱启动子P$_2$来维持}。当\redbf{细胞增殖速度加快}，RNA聚合酶活性升高时，\redbf{强启动子P$_1$}就被激活，DnaQ蛋白的合成就大大增加。

\section{转录水平上的其他调控方式}
\subsection{$\sigma$因子的调节作用}
对大肠杆菌基因组序列进行分析后发现至少存在7种$\sigma$因子，并根据其相对分子质量的大小或编码基因进行命名，其中$\sigma$$^{70}$参与最基本的生理功能基因的转录调控。

除参与热休克$\sigma$$^{32}$/氮代谢的$\sigma$$^{54}$以外，其他5种$\sigma$因子在结构上具有同源性，所以统称\redbf{$\sigma$$^{70}$家族}。

研究发现，所有$\sigma$因子都含有\redbf{4个保守区}，其中\redbf{第2个和第4个保守区}参与\redbf{结合启动区DNA}，第2个保守区的另一部分还参与双链DNA解开成单链的过程。

$\sigma$$^{70}$类启动子在核心酶结合到DNA链上之后才能
与启动子区相结合，而$\sigma$$^{54}$则类似于真核生物的TATA区结合蛋白(TATA-binding protein,TBP)，可以在无核心酶时独立结合到启动子上。

\redbf{与$\sigma$$^{70}$家族因子特异性结合DNA上的-35区和-10区不同，$\sigma$$^{54}$ 因子识别并与DNA上的-24和-12区相结合。}

\begin{kaobox}
    $\sigma$因子的调控作用：
    \begin{itemize}
        \item 交互作用构成网络调控模式，使得原核生物基因表达稳定而平衡;
        \item $\sigma$因子本身的活性受蛋白水解酶的调控，也能被
    同源的抗$\sigma$因子失活。
    \end{itemize}
\end{kaobox}
\subsection{组蛋白类似蛋白的调节作用}
细菌中存在一些非特异性的DNA结合蛋白，用来维持DNA的高级结构，被称为\redbf{组蛋白类似蛋白(histone-like proteins)}
\subsection{转录调控因子的作用}
能够与基因的启动子区相结合，对基因的转录起激活或抑制作用的DNA结合蛋白被称之为\redbf{转录调控因子}。

大肠杆菌基因组中有300多个基因编码这样的蛋白质，它们大多数是\redbf{序列特异性的DNA结合蛋白}，能够与特定的启动子结合。有些能够调控大量基因的表达，而有些仅调控一两个基因的表达。

\subsection{抗终止因子的调节作用}
\redbf{抗终止因子}是能够在特定位点阻止转录终止的一类蛋白质。

当这些蛋白质存在时，RNA聚合酶能够越过终止子，继续转录DNA。这种基因表达调控机制主要见于噬菌体和少数细菌中。


\redbf{抗终止因子}是能够在特定位点阻止转录终止的一类蛋白质。它存在时，RNA聚合酶能够越过终止子，继续转录DNA。

\section{转录后调控}
\subsection{mRNA自身结构对翻译的调节}
\redbf{起始密码子};\redbf{5'非翻译区(5'UTR)};\redbf{转录开关}
\subsubsection{起始密码子}
原核生物的翻译要靠核糖体30S亚基识别mRNA上的起始密码子AUG，以此决定它的开放读码框，AUG的识别由$^{fMet}$-tRNA中含有的碱基配对信息(3'-UAC-5')来完成。
GUG UUG等降低翻译效率

\subsubsection{5'非翻译区(5'UTR)}
遗传信息翻译成多肽链起始于mRNA上的\redbf{核糖体结合位点(ribosome binding site，RBS)}，一般是起始密码子AUG上游的包括SD序列在内的一段非翻译区，该序列与核糖体16SrRNA的3'端互补配对，促使核糖体结合到mRNA上，有利于翻译起始。

核苷酸的变化改变形成mRNA5'端二级结构的自由能，影响了核糖体30S亚基mRNA的结合，从而造成了蛋白质合成效率上的差异(\redbf{调控作用})
\subsubsection{核糖开关}
\redbf{核糖开关}(riboswitch)通常位于原核生物mRNA的5'UTR区域，与其他调控元件不同，核糖开关能够\redbf{感受细胞内诸如代谢物浓度、离子浓度、温度等的变化而改变自身的二级结构和调控功能，从而改变基因的表达状态。}

 例如：
在枯草杆菌(Bacillussubtilis)中，许多参与甲硫氨酸途径的基因5’UTR有大
约2OO bp的RNA被认为是\redbf{SAM感受型核糖开关}。
\subsection{mRNA 稳定性对转录水平的影响}
在糖原合成途径中，如果\redbf{CsrA}蛋白结合到glg基因的mRNA分子上，该mRNA分子就\redbf{易于受核酸酶攻击}，其降解过程加快，其作为蛋白质合成模板的功能就受到抑制。

\subsection{调节蛋白的调控作用}
核糖体蛋白存在翻译抑制的现象
\redbf{核糖体自身翻译抑制的意义？}

\subsection{小RNA的调控作用}
细菌响应环境压力(氧化压力、渗透压、温度等)的改变，会产生一些长度在50~500nt之间的\redbf{非编码小RNA分子}。这些小RNA能结合mRNA或蛋白质，通过改变靶mRNA的稳定性，影响蛋白质-RNA的结合或者mRNA的翻译来调节基因表达。

原核细胞中的非编码RNA称为\redbf{非编码小RNA}
(small non-coding RNA)\redbf{sRNA}.


原核生物sRNA以反式编码sRNA为主，并且大部分都需要RNA分子伴侣Hfq蛋白的协助来发挥作用，主要是通过不严格的碱基互补配对与靶mRNA结合，\redbf{抑制或促进}靶mRNA的翻译，加速或减缓靶mRNA的降解。
\begin{kaobox}
\redbf{小RNA翻译抑制}
\begin{itemize}
    \item 细菌铁蛋白用来储存细胞中过剩的铁离子。\redbf{bfr基因}编码细菌铁蛋白，而\redbf{anti-bfr基因}编码反义RNA。
    \item 细胞中铁离子过多时，Fur蛋白关掉与铁摄取有关的\redbf{anti-bfr基因}的表达，使基因能正常翻译出细菌铁蛋白，储存过剩的铁离子。\redbf{(小RAN抑制翻译)}
    \item 在铁离子浓度低时，\redbf{anti-bfr基因}转录产生大量\redbf{反义RNA}，与mRNA配对，阻止细菌铁蛋白基因翻译。
\end{itemize}
\redbf{小RNA抑制翻译}
\begin{itemize}
    \item 大肠杆菌中受\redbf{氧化压力}诱导产生的OxyS和受\redbf{低温诱导}产生的DsrA基因也以反式编码sRNA的方式调控多个基因的翻译。
    \item \redbf{DsrA的茎-环区域}可以借助\redbf{Hfq蛋白}与rpoS mRNA的前导序列互补配对，导破坏了rpoSmRNA核糖体结合位点序列处的茎-环结构，释放核糖体结合位点，激活mRNA的翻译。
\end{itemize}
\end{kaobox}
\subsection{稀有密码子对翻译的影响}
稀有密码子AUA在高效表达的结构蛋白及o因子中均极少使用，而在表达要求较低的dnaG蛋白中使用频率就相当高。此外，UCG(Ser)、CCU(Pro)、CCC (Pro)、 ACG (Thr), CAA (Gln)、 AAT (Asn)AGG(Arg)等7个密码子的\redbf{使用频率}在不同蛋白质中也有明显差异。
\subsection{重叠基因对翻译的影响}
trp操纵子在正常情况下，研究trpE和trpD以及trpB和trpA两对基因中核苷酸序列，发现rpE基因的终止密码子和trpD基因的\redbf{起始密码子}共用一个核苷酸。这种重叠的密码保证了同一核糖体对两个连续基因进行翻译的机制。实验证明，\redbf{偶联翻译}可能是保证两个基因产物在数量上相等的重要手段。


lac 基因产物数量上的比较

在一个完全被诱导的细胞中，$\beta$-半乳糖苷酶、透过酶及乙酰基
转移酶的拷贝数比例为1∶0.5∶0.2。酶数量上的差异是由于翻
译水平上两种方式调节所致。

大肠杆菌gal操纵子的galT的终止密码子虽然与galK的起始密码子\redbf{相隔3个核苷酸}，galK基因的SD序列却位于galT基因终止密码子之前，这一现象与前述偶联翻译并不完全相同，因为核糖体结合在mRNA上，覆盖了20个核苷酸，包括SD序列和galK基因的起始密码子，当galT翻译终止时，核糖体还未脱落就直接与SD序列结合，开始galK的翻译，\redbf{保证两个基因的等量翻译}，也是一种翻译偶联。
\subsection{翻译的阻遏}
Q$\beta$ 噬菌体RNA进入细菌后，称为(+)链的RNA立即作为模板指导合成复制酶，并与宿主中已有的亚基结合行使复制功能。但是，Qβ(+)RNA链上此时已有不少核糖体，它们从5'向3'方向进行\redbf{翻译}，这无疑影响了\redbf{复制酶催化的从3'向5'方向进行的(-)链合成}。

\subsection{魔斑核苷酸水平对翻译的影响}
细菌饥饿时，rRNA和tRNA的合成减少约10~20倍，某些mRNA的合成下降大约3倍，核苷酸、糖和脂类等的合成也下降，蛋白质降解速度则加快，这种状况称\redbf{严紧反应或应急反应。}

应急反应时\redbf{ppGpp和pppGpp}含量增加，在层析谱上检出这两种化合物的斑点称为称\redbf{魔斑I和魔斑II}，魔斑的主要功能是抑制大多数基因转录的
延伸。
警报素(alarmone)

细胞缺乏氨基酸时，ppGpp水平提高，抑制了翻译，\redbf{使游离核糖体大大增加}，引发抑制核糖体和其他大分子合成等\redbf{应急反应}，活化某些氨基酸操纵子的转录表达，抑制与氨基酸运转无关的系统，活化蛋白水解酶等，以节省能源和增加氨基酸含量，\redbf{渡过难关}。
```