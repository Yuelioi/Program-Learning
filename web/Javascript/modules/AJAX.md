前端

```html
<form>
  <div class="form-item">
    <label for="postID">文章ID</label>
    <input type="text" name="postID" id="postID" />
  </div>
  <div class="form-item">
    <label for="orderID">订单号</label>
    <input type="text" name="orderID" id="orderID" />
  </div>
  <button type="button" id="submit">提交</button>
</form>

<div id="show-area">
  <textarea name="" id="show-content" cols="30" rows="10"></textarea>
</div>

<script>
  $("#submit").click(function () {

    $.post({
      url: "form.php",
      data: {
        postID: $("#postID").val(),
        orderID: $("#orderID").val(),
      },
      success: function (result) {
        $("#show-content").html(result);
      },
    });
  });
  // document.getElementById("show-content").value = "111";
</script>
```

后端

```php
<?php
$q = $_POST["orderID"];

//查找是否由匹配值， 如果 q>0
if (strlen($q) > 0) {
  echo $q;
}
```
