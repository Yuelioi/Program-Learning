import base64

import requests

# 官方文档: https://developer.wordpress.org/rest-api/
# 接口文档: https://blog.csdn.net/weixin_38633659/article/details/105924225
# 应用程序密码: https://www.vpsgo.com/wordpress-application-passwords.html

api_url = "https://www.yuelili.com/wp-json/wp/v2/posts"
username = "yueli"
application_password = "PxuI KuxL zGsM pHvK llod 8ZKM"  # 见<应用程序密码>


# 要发布的文章数据
post_data = {
    "title": "Post Title",
    "slug": "ae",
    "content": "post content",
    "status": "publish",
    "categories": "20,72",  # 文章分类id
    "tags": "694, 703",  # 文章tag id
}


token = base64.b64encode(f"{username}:{application_password}".encode())

header = {"Authorization": "Basic " + token.decode("utf-8")}
response = requests.post(api_url, data=post_data, headers=header)
print(response.json())
