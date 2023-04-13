import pytest


class TestCase:
    age = 22

    @pytest.mark.skip(reason="直接跳过")
    def test_1(self):
        print("Testing")

    @pytest.mark.skipif(age < 20, reason="变量<20")
    def test_2(self):
        print("Testing")


if __name__ == "__main__":
    pytest.main()
