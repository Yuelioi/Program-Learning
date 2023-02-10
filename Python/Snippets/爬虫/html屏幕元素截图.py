def getGraph(path, imgPath):

    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from PIL import Image

    driver = webdriver.Chrome(
        executable_path=r"H:\Snippets\Program-Learning\Python\chromedriver.exe")
    driver.get(path)

    element = driver.find_element(by=By.CLASS_NAME, value="graph")

    location = element.location
    size = element.size

    driver.save_screenshot(imgPath)

    x = location['x']
    y = location['y']
    width = location['x'] + size['width']
    height = location['y'] + size['height']

    im = Image.open(imgPath, mode='r')
    im = im.crop((int(x), int(y), int(width), int(height)))
    im.save(imgPath)


def grabImg():
    # 使用 GrabzIt: 只能爬在线的
    from GrabzIt import GrabzItClient
    from GrabzIt import GrabzItImageOptions
    grabzIt = GrabzItClient.GrabzItClient(
        "NTE0OGM3Y2Q4ZDhmNDAxN2FiNjQzYWNlYTI5NGYxNDI=", "Pz8tTz8/BktNAD8/Pz9dAkM/PwgJP1kLVT9/Oj4/TT8=")

    options = GrabzItImageOptions.GrabzItImageOptions()
    options.targetElement = ".graph"
    options.format = "png"

    grabzIt.URLToImage(
        r"https://docs.unrealengine.com/5.1/en-US/BlueprintAPI/Utilities/Animation/CalculateDirection/", options)
    # Then call the Save or SaveTo method
    grabzIt.SaveTo("result.png")


path = r'file:///H:/Scripting/Vue%20Projects/docs2_yuelili_com/UE/BlueprintAPI-HTML/en-US/Utilities/Animation/CalculateDirection/index.html'
imgPath = "./Python/Snippets/data/mage312.png"
getGraph(path, imgPath)
