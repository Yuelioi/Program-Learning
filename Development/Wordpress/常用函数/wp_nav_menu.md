[Wordpress菜单函数wp_nav_menu各参数详解及示例_逝去abcde的博客-CSDN博客_wp_nav_menu](https://blog.csdn.net/qq_37296622/article/details/82633833)

注册

```php
register_nav_menus(array(
'PrimaryMenu'=>'导航',
'friendlinks'=>'友情链接',
'footer_nav'=>'页脚导航'));
add_theme_support('nav_menus'); 
```



```php 
<?php 
wp_nav_menu( array(
    'theme_location'  => '',//导航别名
    'menu'   => '', //期望显示的菜单
    'container'  => 'div',  //容器标签
    'container_class' => '',//ul父节点class值
    'container_id'  => '',  //ul父节点id值
    'menu_class'   => 'menu',   //ul节点class值
    'menu_id'   => '',  //ul节点id值
    'echo'  => true,//是否输出菜单，默认为真
    'fallback_cb' => 'wp_page_menu',  //菜单不存在时，返回默认菜单，设为false则不返回
    'before' => '', //链接前文本
    'after'  => '', //链接后文本
    'link_before'  => '',   //链接文本前
    'link_after'  => '',//链接文本后
    'items_wrap'  => '<ul id="%1$s" class="%2$s">%3$s</ul>',   //如何包装列表
    'depth' => 0,   //菜单深度，默认0
    'walker' => ''  //自定义walker
  ) );
?>
```

最简单的用法

```php
<?php 
    wp_nav_menu( array( 'theme_location'=>'PrimaryMenu', 'depth' => 0) );
?> 
```