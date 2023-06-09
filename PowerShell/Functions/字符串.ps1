# Replace
$str1 = "hello world" 

# 获取所有方法属性 以及查看字符串帮助
# $str1 | Get-Member -MemberType Property | Select-Object -ExpandProperty Name
# $str1 | Get-Member -MemberType Method | Select-Object -ExpandProperty Name
# Get-Help -Name "PadLeft" -Category "Method" -Full -Type "String"


$str1.Equals("hello world" )

<# *固有属性
Length
#>

<# *增
Insert

<# *查
IndexOf LastIndexOf(普通查索引) IndexOfAny LastIndexOfAny(支持数组√)  "hello world".IndexOfAny(@("e", "l")) => 1
EndsWith StartsWith Equals
IsNormalized (@NET 归一化处理)

GetEnumerator
GetHashCode
GetType
GetTypeCode

# 字符串是否为空
[string]::IsNullOrEmpty($str1)
#>

<# *删
Remove
Replace 支持正则喔
Substring
Split
#>

<# *格式化处理
PadLeft PadRight
Trim TrimEnd TrimStart
#>

<# *其他
Clone
CompareTo
Contains
CopyTo
Normalize
#>

<# *转换 TO...
ToLower ToUpper(基于时区变化) ToLowerInvariant ToUpperInvariant(@NET 恒定不变√)
ToBoolean ToByte ToChar ToCharArray ToDateTime ToDecimal ToDouble ToInt16 ToInt32 ToInt64ToSByte
ToSingle ToString ToType ToUInt16 ToUInt32 ToUInt64
#>


$string1 = ""
[string]::IsNullOrEmpty($string1)
