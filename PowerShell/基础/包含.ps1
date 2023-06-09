# -contains
# -notcontains
# -in
# -notin

@(1..4) -contains 1
@(1..4) -notcontains 1

1 -in @(1..4)
1 -notin @(1..4)

