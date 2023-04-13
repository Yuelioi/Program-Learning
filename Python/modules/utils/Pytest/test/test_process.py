# 预处理/处理后
# 如果所有测试类都需要这些, 可以继承
import pytest


class Com:

    def setup_class(self):
        # 每个类之前
        ...

    def teardown_class(self):
        # 每个类之后
        ...

    def setup(self):
        # 每个例之前
        ...

    def teardown(self):
        # 每个例之后
        ...

# fixture 可以指定处理范围
# -scope:作用域 fucntion/class/package/session
# -autouse: 自动执行所有作用域的, 不需要再指定了, 默认为Fal se


@pytest.fixture(scope="function")
def sql_query():
    ...


class Query:

    def test_1(self):
        ...

    # 会先调用sql_query

    def test_2(self, sql_query):
        ...
