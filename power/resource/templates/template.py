from jinja2 import Template


context1 = {
    "bid": "e53a35a1-ffda-4e65-927b-97a199960aaa",
    "attacker": {
        "current_health": 2000,
        "max_health": 2560,
        "avatar_src": "灵-女.png",
        "name": "幻影剑客",
        "profession": "幻影剑客",
        "race": "人族",
        "power": 1587,
        "physical_attack": 221,
        "magical_attack": 185,
        "physical_shield": 85,
        "magical_shield": 85,
    },
    "defender": {
        "current_health": 2000,
        "max_health": 2840,
        "avatar_src": "灵-女.png",
        "name": "龙骑士",
        "profession": "龙骑士",
        "race": "人族",
        "power": 1587,
        "physical_attack": 185,
        "magical_attack": 185,
        "physical_shield": 120,
        "magical_shield": 85,
    },
    "weather": "电闪雷鸣,",
    "rounds": [
        {
            "round_number": 1,
            "actions": [
                {
                    "character": "defender",
                    "username": "无名氏",
                    "skill": "",
                    "critical": 0,
                    "damage": 0,
                    "damage_type": "physical",
                    "extra": "受到电闪雷鸣影响, 幻影剑客被闪电击中,生命值损失126",
                },
                {
                    "character": "defender",
                    "username": "无名氏",
                    "skill": "",
                    "critical": 0,
                    "damage": 0,
                    "damage_type": "physical",
                    "extra": "龙骑士使用「1级飞龙在天」,提高物攻/法攻",
                },
                {
                    "character": "attacker",
                    "username": "无名氏",
                    "skill": "",
                    "critical": 0,
                    "damage": 0,
                    "damage_type": "physical",
                    "extra": "幻影剑客使用「1级飞燕诀」,攻击/暴击/爆伤提升",
                },
                {
                    "character": "attacker",
                    "username": "无名氏",
                    "skill": "",
                    "critical": 0,
                    "damage": 0,
                    "damage_type": "physical",
                    "extra": "幻影剑客触发连击效果",
                },
                {
                    "character": "attacker",
                    "username": "无名氏",
                    "skill": "",
                    "critical": 0,
                    "damage": 0,
                    "damage_type": "physical",
                    "extra": "幻影剑客使用「1级飞燕诀」,攻击/暴击/爆伤提升",
                },
            ],
        },
        {
            "round_number": 2,
            "actions": [
                {
                    "character": "defender",
                    "username": "无名氏",
                    "skill": "",
                    "critical": 0,
                    "damage": 0,
                    "damage_type": "physical",
                    "extra": "龙骑士使用「1级飞龙在天」,提高物攻/法攻",
                },
                {
                    "character": "attacker",
                    "username": "无名氏",
                    "skill": "",
                    "critical": 0,
                    "damage": 0,
                    "damage_type": "physical",
                    "extra": "幻影剑客使用「1级飞燕诀」,攻击/暴击/爆伤提升",
                },
                {
                    "character": "attacker",
                    "username": "无名氏",
                    "skill": "",
                    "critical": 0,
                    "damage": 0,
                    "damage_type": "physical",
                    "extra": "幻影剑客触发连击效果",
                },
                {
                    "character": "attacker",
                    "username": "无名氏",
                    "skill": "",
                    "critical": 0,
                    "damage": 0,
                    "damage_type": "physical",
                    "extra": "幻影剑客使用「1级飞燕诀」,攻击/暴击/爆伤提升",
                },
            ],
        },

        {
            "round_number": 2,
            "actions": [
                {
                    "character": "defender",
                    "username": "无名氏",
                    "skill": "",
                    "critical": 0,
                    "damage": 0,
                    "damage_type": "physical",
                    "extra": "龙骑士使用「1级飞龙在天」,提高物攻/法攻",
                },
                {
                    "character": "attacker",
                    "username": "无名氏",
                    "skill": "",
                    "critical": 0,
                    "damage": 0,
                    "damage_type": "physical",
                    "extra": "幻影剑客使用「1级飞燕诀」,攻击/暴击/爆伤提升",
                },
                {
                    "character": "attacker",
                    "username": "无名氏",
                    "skill": "",
                    "critical": 0,
                    "damage": 0,
                    "damage_type": "physical",
                    "extra": "幻影剑客触发连击效果",
                },
                {
                    "character": "attacker",
                    "username": "无名氏",
                    "skill": "",
                    "critical": 0,
                    "damage": 0,
                    "damage_type": "physical",
                    "extra": "幻影剑客使用「1级飞燕诀」,攻击/暴击/爆伤提升",
                },
            ],
        },
    ],
    "winner": {"username": "龙骑士", "gold": 0, "experience": 0},
}


context2 = {
    "attacker": {
        "current_health": 2000,
        "max_health": 2560,
        "avatar_src": "灵-女.png",
        "name": "月灵",
        "level": "15",
        "profession": "幻影剑客",
        "race": "人族",
        "power": 1587,
        "gold": 1587,
        "physical_attack": 221,
        "magical_attack": 185,
        "physical_defense": 85,
        "magical_defense": 85,
        "physical_critical_chance": 18,
        "magical_critical_chance": 15,
        "physical_critical_damage": 190,
        "magical_critical_damage": 180,
        "speed": 130,
        "luck": 130,
        "accuracy": 130,
        "evasion": 130,
    }}


# 定义模板
template = Template(
    open("./power/resource/templates/item.jinja", encoding="utf-8").read())

rendered_html = template.render(context2)


output_file_path = f"./power/resource/templates/test.html"
# 打开文件并写入渲染后的HTML内容
with open(output_file_path, 'w', encoding='utf-8') as output_file:
    output_file.write(rendered_html)
