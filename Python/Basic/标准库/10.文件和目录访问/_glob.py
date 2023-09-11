import glob
glob.glob('./[0-9].*')
glob.glob('*.py')
glob.glob('?.gif')
glob.glob('**/*.txt', recursive=True)
glob.glob('./**/', recursive=True)
print(glob.glob('./**/', recursive=True))
