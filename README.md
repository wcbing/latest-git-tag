# Latest Git Tag

A Cloudflare worker used to fetch the latest Git tag from the Git hosting site.

## Usage

`/owner/repo[?parm]`

## Parm

### pure: pure format (only version)
example: `/owner/repo?pure=1`

the normal format (after formatting)
```json
{
    "version_tag":"v1.2.0",
    "version":"1.2.0"
}
```
or
```json
{
    "version_tag":"2.1.0",
    "version":"2.1.0"
}
```
the pure format
```
1.2.0
```

### site: Git hosting site  
example: `/owner/repo?site=gitee.com`

default is `github.com`.
