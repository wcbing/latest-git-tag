export default {
    async fetch(request) {
        const url = new URL(request.url);
        const repo = url.pathname.replace(/^\/|\/$/g, "");
        const pure = url.searchParams.get("pure");
        const site = url.searchParams.get("site") || "github.com";

        const Usage = `<h2>Usage</h2>
${url.host}/owner/repo[?parm]
<h2>Parm</h2>
<ul>
<li>pure: pure format, only version<br>
${url.host}/owner/repo?pure=1</li>
<li>site: Git hosting site, default is github.com<br>
${url.host}/owner/repo?site=gitee.com</li>
</ul>`;

        // 检查是否提供 repo 参数，没有则给出使用说明
        if (!repo) {
            return new Response(Usage, {
                status: 200,
                headers: { "Content-Type": "text/html" },
            });
        }

        try {
            // 发送 HEAD 请求，阻止自动重定向
            const response = await fetch(`https://${site}/${repo}/releases/latest`, {
                method: "HEAD",
                redirect: "manual",
            });

            const location = response.headers.get("Location");
            if (!location) {
                return new Response(null, { status: 404 });
            }

            // 使用正则提取版本号
            const match_tag = location.match(/\/releases\/tag\/([^_]*)/);
            const version_tag = match_tag ? match_tag[1] : "未知版本";

            const match_version = version_tag.match(/[vV]?(.*)/);
            const version = match_version ? match_version[1] : "未知版本";

            if (pure) {
                return new Response(version, { status: 200 });
            }
            return new Response(JSON.stringify({ version_tag, version }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });

        } catch (error) {
            return new Response(null, { status: 500 });
        }
    },
};
