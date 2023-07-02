import PySimpleGUI as sg
import os
import pathlib
import shutil

sg.ChangeLookAndFeel('SystemDefault')
font = ("思源黑体, 11")

layout = [
    [sg.Multiline(key='files', size=(52, 6)), sg.Input(
        key='fileread', visible=False, enable_events=True)],
    [sg.ProgressBar(1, orientation='h', size=(52, 20), key='progress')],
    [sg.FolderBrowse(target='fileread', button_text='文件夹', key='FolderBrowse', size=(10, 1), enable_events=True), sg.FilesBrowse(target='fileread', button_text="选择文件", size=(
        10, 1)), sg.Submit(button_text='文件树', key='fileTree', size=(10, 1)), sg.Button(button_text='生成文件夹', key='file2Folder', size=(10, 1))],
]
window = sg.Window(title='月离离 Files Tree 1.1', layout=layout,
                   icon=r'G:\back\pyfile\月离离工具箱\icons\folder.ico', font=font)


while True:
    event, values = window.read()
    fileTree = window.find_element('fileTree')
    progress_bar = window.find_element('progress')

    if event == 'file2Folder':
        window['file2Folder'].update(disabled=True)
        files_list = values['files'].split('\n')

        i = 0
        for file_path in files_list:
            lens = len(files_list)
            if lens != 0:
                progress_bar.UpdateBar(i / lens * 5, 5)
            foldername = file_path.rsplit('/', 1)[0]
            filename = file_path.rsplit('/', 1)[1]

            to_folder = f'{foldername}/' + filename.rsplit('.', 1)[0]
            # 判断并创建文件夹
            if not os.path.exists(to_folder):
                os.makedirs(to_folder)
            # 移动文件
            shutil.move(
                file_path,
                (
                    ((f'{foldername}/' + filename.rsplit('.', 1)
                     [0]) + '/') + filename
                ),
            )

        progress_bar.UpdateBar(5, 5)
        window['file2Folder'].update(disabled=False)

    if event == 'fileTree':
        foldername = values['files'] or '.'
        # 生成过程中，禁用按钮
        window['fileTree'].update(disabled=True)

        # 遍历
        for folderName, subfolders, filenames in os.walk(foldername):
            out_folder = f'{foldername}_output'
            if os.path.exists(out_folder):
                break

            for i, subfolder in enumerate(subfolders):
                lens = len(filenames)
                if lens != 0:
                    # 进度条。。弄着玩的，因为基本上都是秒生成
                    progress_bar.UpdateBar(i / lens * 5, 5)
                fold = f'{folderName}/{subfolder}'.replace(
                    foldername, out_folder
                ).replace('\\', '/')
                os.makedirs(fold)
            # 生成文件
            for filename in filenames:
                path = (folderName).replace(foldername, out_folder).replace(
                    '\\', '/') + '/' + filename
                pathlib.Path(path).touch()

        progress_bar.UpdateBar(5, 5)
        # 结束以后 恢复按钮
        fileTree.update(disabled=False)

    if event == 'fileread':
        window.Element('files').Update(
            '\n'.join(values['fileread'].split(';')))
    if event in (None, 'Exit'):
        break


window.close()
