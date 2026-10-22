param([switch]$NoBrowser,[int]$Port=0,[string]$RootPath='')
$ErrorActionPreference='Stop'
if (!$RootPath) { $RootPath=Join-Path $PSScriptRoot '..\public' }
$root=[IO.Path]::GetFullPath($RootPath).TrimEnd('\')
if (!(Test-Path -LiteralPath (Join-Path $root 'index.html') -PathType Leaf)) { throw 'Missing game index.html' }
$listener=New-Object Net.Sockets.TcpListener([Net.IPAddress]::Loopback,$Port)
$listener.Start()
$boundPort=$listener.LocalEndpoint.Port
$url="http://127.0.0.1:$boundPort/"
Write-Output "Local: $url"
if (!$NoBrowser) { Start-Process $url }
$mime=@{'.html'='text/html; charset=utf-8';'.js'='text/javascript; charset=utf-8';'.json'='application/json; charset=utf-8';'.svg'='image/svg+xml';'.png'='image/png';'.ttf'='font/ttf'}
try {
  while ($true) {
    $client=$listener.AcceptTcpClient()
    try {
      $client.ReceiveTimeout=3000;$client.SendTimeout=5000
      $stream=$client.GetStream()
      # Read bounded HTTP headers. No request body, remote bind, command handler,
      # directory listing, credential access or dependency download exists.
      $header=New-Object 'Collections.Generic.List[byte]'
      while ($header.Count -lt 8192) {
        $b=$stream.ReadByte();if($b -lt 0){break};$header.Add([byte]$b)
        $n=$header.Count
        if($n -ge 4 -and $header[$n-4] -eq 13 -and $header[$n-3] -eq 10 -and $header[$n-2] -eq 13 -and $header[$n-1] -eq 10){break}
      }
      $first=([Text.Encoding]::ASCII.GetString($header.ToArray()) -split "`r`n")[0] -split ' '
      $status='200 OK';$type='text/plain; charset=utf-8';$body=[byte[]]@();$head=$first[0] -eq 'HEAD'
      if($first.Count -lt 3 -or $first[0] -notin @('GET','HEAD')){$status='405 Method Not Allowed'}
      else {
        $requestPath=[Uri]::UnescapeDataString(($first[1] -split '\?')[0]).Replace('/','\')
        if($requestPath -eq '\'){$requestPath='\index.html'}
        $filename=[IO.Path]::GetFullPath((Join-Path $root $requestPath.TrimStart('\')))
        $extension=[IO.Path]::GetExtension($filename).ToLowerInvariant()
        if(!$filename.StartsWith($root+'\',[StringComparison]::OrdinalIgnoreCase) -or !$mime.ContainsKey($extension)){$status='403 Forbidden'}
        elseif(!(Test-Path -LiteralPath $filename -PathType Leaf)){$status='404 Not Found'}
        else{$body=[IO.File]::ReadAllBytes($filename);$type=$mime[$extension]}
      }
      $response="HTTP/1.1 $status`r`nContent-Type: $type`r`nContent-Length: $($body.Length)`r`nConnection: close`r`nCache-Control: no-store`r`nX-Content-Type-Options: nosniff`r`n`r`n"
      $bytes=[Text.Encoding]::ASCII.GetBytes($response);$stream.Write($bytes,0,$bytes.Length)
      if(!$head -and $body.Length){$stream.Write($body,0,$body.Length)}
    } catch { Write-Warning $_.Exception.Message } finally { $client.Close() }
  }
} finally { $listener.Stop() }
