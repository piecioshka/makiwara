Output demo/makiwara.gif

Require makiwara

Set Shell "bash"
Set Framerate 60
Set FontSize 12
Set Width 800
Set Height 400
Set Padding 20
Set Margin 5
Set MarginFill "#212830"
Set BorderRadius 10

Hide
Type 'cd /tmp/makiwara-demo && clear' Enter
Show

Type "makiwara --help" Sleep 200ms Enter
Wait Sleep 1500ms

Enter Enter Type "# benchmark how many requests a URL serves within a time limit" Sleep 200ms Enter Enter
Wait Sleep 800ms

Type "makiwara -u https://example.org -t 1 -s sequence" Sleep 500ms Enter
Wait Sleep 1500ms

Sleep 3s
