// 默认 DNS 服务器列表
const defaultNameservers = [
  "tls://223.5.5.5", // 阿里
  "tls://119.29.29.29", // 腾讯
  // "114.114.114.114", // 114
];

// 国内 DNS 服务器
const domesticNameservers = [
  "https://223.5.5.5/dns-query", // 阿里
  "https://119.29.29.29/dns-query", // 腾讯
  // "223.5.5.5", // 阿里
  // "119.29.29.29", // 腾讯
  // "114.114.114.114", // 114
];

// 国外 DNS 服务器
const foreignNameservers = [
  "https://8.8.8.8/dns-query", // GoogleDNS
  "https://1.1.1.1/dns-query", // CloudflareDNS
  // "https://77.88.8.8/dns-query", // YandexDNS
  // "https://208.67.222.222/dns-query#ecs=1.1.1.1/24&ecs-override=true", // OpenDNS
  // "https://9.9.9.9/dns-query", // Quad9DNS
];

// DNS 配置
const dnsConfig = {
  enable: true,
  listen: "0.0.0.0:1053",
  // "ipv6": true,
  // DOH 优先使用 http/3
  "prefer-h3": false,
  // dns 连接遵守路由规则，需配置 proxy-server-nameserver
  "respect-rules": true,
  // 是否查询系统 hosts，默认 true
  "use-system-hosts": true,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    "geosite:private",
    "geosite:connectivity-check",
    // 本地主机/设备
    "+.lan",
    "+.local",
    // Windows 网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ 快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com",
    // uu
    "uu.163.com",
  ],
  // 用于解析 DNS 服务器的域名, 必须为 IP, 可为加密 DNS
  "default-nameserver": [...defaultNameservers],
  // 默认的域名解析服务器, 如不配置 fallback/proxy-server-nameserver, 则所有域名都由 nameserver 解析
  "nameserver": [...foreignNameservers],
  // 代理节点域名解析服务器，仅用于解析代理节点的域名，如果不填则遵循 nameserver-policy、nameserver 和 fallback 的配置
  "proxy-server-nameserver": [...domesticNameservers],
  // 用于 direct 出口域名解析的 DNS 服务器，如果不填则遵循 nameserver-policy、nameserver 和 fallback 的配置
  "direct-nameserver": [...domesticNameservers],
  // 是否遵循 nameserver-policy，默认为不遵守，仅当 direct-nameserver 不为空时生效
  "direct-nameserver-follow-policy": false,
  // 指定域名查询的解析服务器，可使用 geosite, 优先于 nameserver/fallback 查询
  "nameserver-policy": {
    "geosite:cn": domesticNameservers,
    // pikpak域名使用国内 DNS
    "+.mypikpak.com": domesticNameservers,
    // "+.mypikpak.net": domesticNameservers,
    // "+.dl.pikpak.io": domesticNameservers,
  },
};

// 规则集通用配置
const ruleProviderCommon = {
  type: "http",
  format: "yaml",
  interval: 86400,
};
// Loyalsoldier 规则集
// https://github.com/Loyalsoldier/clash-rules
const loyalsoldierRuleProviders = {
  // 直连域名列表
  direct: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    path: "./ruleset/loyalsoldier/direct.yaml",
  },
  // 代理域名列表
  proxy: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    path: "./ruleset/loyalsoldier/proxy.yaml",
  },
  // 广告域名列表
  reject: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    path: "./ruleset/loyalsoldier/reject.yaml",
  },
  // 私有网络专用域名列表
  private: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    path: "./ruleset/loyalsoldier/private.yaml",
  },
  // Apple 在中国大陆可直连的域名列表
  apple: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    path: "./ruleset/loyalsoldier/apple.yaml",
  },
  // iCloud 域名列表
  icloud: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    path: "./ruleset/loyalsoldier/icloud.yaml",
  },
  // [慎用] Google 在中国大陆可直连的域名列表
  // google: {
  //   ...ruleProviderCommon,
  //   behavior: "domain",
  //   url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
  //   path: "./ruleset/loyalsoldier/google.yaml",
  // },
  // GFWList 域名列表
  gfw: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    path: "./ruleset/loyalsoldier/gfw.yaml",
  },
  // 非中国大陆使用的顶级域名列表
  "tld-not-cn": {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    path: "./ruleset/loyalsoldier/tld-not-cn.yaml",
  },
  // Telegram 使用的 IP 地址列表
  telegramcidr: {
    ...ruleProviderCommon,
    behavior: "ipcidr",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    path: "./ruleset/loyalsoldier/telegramcidr.yaml",
  },
  // 局域网 IP 及保留 IP 地址列表
  cncidr: {
    ...ruleProviderCommon,
    behavior: "ipcidr",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    path: "./ruleset/loyalsoldier/cncidr.yaml",
  },
  // 中国大陆 IP 地址列表
  lancidr: {
    ...ruleProviderCommon,
    behavior: "ipcidr",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    path: "./ruleset/loyalsoldier/lancidr.yaml",
  },
  // 需要直连的常见软件列表
  applications: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    path: "./ruleset/loyalsoldier/applications.yaml",
  },
};
// MetaCubeX 规则集
// https://github.com/MetaCubeX/meta-rules-dat/tree/meta/geo/geosite/classical
const metaCubeXRuleProviders = {
  "category-ads-all": {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/category-ads-all.yaml",
    path: "./ruleset/MetaCubeX/category-ads-all.yaml",
  },
  "category-ai-not-cn": {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/category-ai-!cn.yaml",
    path: "./ruleset/MetaCubeX/category-ai-not-cn.yaml",
  },
  "category-ai-cn": {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/category-ai-cn.yaml",
    path: "./ruleset/MetaCubeX/category-ai-cn.yaml",
  },
  "category-android-app-download": {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/category-android-app-download.yaml",
    path: "./ruleset/MetaCubeX/category-android-app-download.yaml",
  },
  "category-dev": {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/category-dev.yaml",
    path: "./ruleset/MetaCubeX/category-dev.yaml",
  },
  "category-emby": {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/category-emby.yaml",
    path: "./ruleset/MetaCubeX/category-emby.yaml",
  },
  "category-game-accelerator-cn": {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/category-game-accelerator-cn.yaml",
    path: "./ruleset/MetaCubeX/category-game-accelerator-cn.yaml",
  },
  "category-game-platforms-download": {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/category-game-platforms-download.yaml",
    path: "./ruleset/MetaCubeX/category-game-platforms-download.yaml",
  },
  "category-games": {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/category-games.yaml",
    path: "./ruleset/MetaCubeX/category-games.yaml",
  },
  "category-games-cn": {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/category-games@cn.yaml",
    path: "./ruleset/MetaCubeX/category-games-cn.yaml",
  },
  "category-porn": {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/category-porn.yaml",
    path: "./ruleset/MetaCubeX/category-porn.yaml",
  },
  "category-pt": {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/category-pt.yaml",
    path: "./ruleset/MetaCubeX/category-pt.yaml",
  },
  "category-public-tracker": {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/category-public-tracker.yaml",
    path: "./ruleset/MetaCubeX/category-public-tracker.yaml",
  },
  "category-social-media-not-cn": {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/category-social-media-!cn.yaml",
    path: "./ruleset/MetaCubeX/category-social-media-not-cn.yaml",
  },
  bahamut: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/bahamut.yaml",
    path: "./ruleset/MetaCubeX/bahamut.yaml",
  },
  bilibili: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/bilibili.yaml",
    path: "./ruleset/MetaCubeX/bilibili.yaml",
  },
  bing: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/bing.yaml",
    path: "./ruleset/MetaCubeX/bing.yaml",
  },
  cursor: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/cursor.yaml",
    path: "./ruleset/MetaCubeX/cursor.yaml",
  },
  deepseek: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/deepseek.yaml",
    path: "./ruleset/MetaCubeX/deepseek.yaml",
  },
  epicgames: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/epicgames.yaml",
    path: "./ruleset/MetaCubeX/epicgames.yaml",
  },
  ubisoft: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/ubisoft.yaml",
    path: "./ruleset/MetaCubeX/ubisoft.yaml",
  },
  google: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/google.yaml",
    path: "./ruleset/MetaCubeX/google.yaml",
  },
  "google-fcm": {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/googlefcm.yaml",
    path: "./ruleset/MetaCubeX/googlefcm.yaml",
  },
  "google-gemini": {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/google-gemini.yaml",
    path: "./ruleset/MetaCubeX/google-gemini.yaml",
  },
  "google-play": {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/google-play.yaml",
    path: "./ruleset/MetaCubeX/google-play.yaml",
  },
  pikpak: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/pikpak.yaml",
    path: "./ruleset/MetaCubeX/pikpak.yaml",
  },
  spotify: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/spotify.yaml",
    path: "./ruleset/MetaCubeX/spotify.yaml",
  },
  steam: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/steam.yaml",
    path: "./ruleset/MetaCubeX/steam.yaml",
  },
  tiktok: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/tiktok.yaml",
    path: "./ruleset/MetaCubeX/tiktok.yaml",
  },
  telegram: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/telegram.yaml",
    path: "./ruleset/MetaCubeX/telegram.yaml",
  },
  microsoft: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/microsoft.yaml",
    path: "./ruleset/MetaCubeX/microsoft.yaml",
  },
  netflix: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/netflix.yaml",
    path: "./ruleset/MetaCubeX/netflix.yaml",
  },
  youtube: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/youtube.yaml",
    path: "./ruleset/MetaCubeX/youtube.yaml",
  },
  // openai: {
  //   ...ruleProviderCommon,
  //   behavior: "classical",
  //   url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/openai.yaml",
  //   path: "./ruleset/MetaCubeX/openai.yaml",
  // },
  // anthropic: {
  //   ...ruleProviderCommon,
  //   behavior: "classical",
  //   url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/anthropic.yaml",
  //   path: "./ruleset/MetaCubeX/anthropic.yaml",
  // },
  // xai: {
  //   ...ruleProviderCommon,
  //   behavior: "classical",
  //   url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/xai.yaml",
  //   path: "./ruleset/MetaCubeX/xai.yaml",
  // },
  // perplexity: {
  //   ...ruleProviderCommon,
  //   behavior: "classical",
  //   url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/perplexity.yaml",
  //   path: "./ruleset/MetaCubeX/perplexity.yaml",
  // },
};
// ACL4SSR
const acl4RuleProviders = {
  // AI: {
  //   ...ruleProviderCommon,
  //   behavior: "classical",
  //   url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Providers/Ruleset/AI.yaml",
  //   path: "./ruleset/ACL4SSR/ai.yaml",
  // },
  // Developer: {
  //   ...ruleProviderCommon,
  //   behavior: "classical",
  //   url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Providers/Ruleset/Developer.yaml",
  //   path: "./ruleset/ACL4SSR/ai.yaml",
  // },
  // Docker: {
  //   ...ruleProviderCommon,
  //   behavior: "classical",
  //   url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Providers/Ruleset/Docker.yaml",
  //   path: "./ruleset/ACL4SSR/ai.yaml",
  // },
  // BilibiliHMT: {
  //   ...ruleProviderCommon,
  //   behavior: "classical",
  //   url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Providers/Ruleset/BilibiliHMT.yaml",
  //   path: "./ruleset/ACL4SSR/BilibiliHMT.yaml",
  // },
  // Bing: {
  //   ...ruleProviderCommon,
  //   behavior: "classical",
  //   url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Providers/Ruleset/Bing.yaml",
  //   path: "./ruleset/ACL4SSR/Bing.yaml",
  // },
  // GoogleFCM: {
  //   ...ruleProviderCommon,
  //   behavior: "classical",
  //   url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Providers/Ruleset/GoogleFCM.yaml",
  //   path: "./ruleset/ACL4SSR/GoogleFCM.yaml",
  // },
  // GameDownload: {
  //   ...ruleProviderCommon,
  //   behavior: "classical",
  //   url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Providers/Ruleset/GameDownload.yaml",
  //   path: "./ruleset/ACL4SSR/GameDownload.yaml",
  // },
};

// 规则集配置
const ruleProviders = {
  ...loyalsoldierRuleProviders,
  ...metaCubeXRuleProviders,
  // ...acl4RuleProviders,
};

// 自定义规则
const customRules = [
  // PikPak 下载
  // 示例：dl-z01a-0053.mypikpak.com
  "DOMAIN-SUFFIX,dl.pikpak.io,🅿️ PikPak 下载",
  "DOMAIN-REGEX,^dl-[a-z0-9-]+\.mypikpak\.com$,🅿️ PikPak 下载",
  "DOMAIN-REGEX,^dl-[a-z0-9-]+\.mypikpak\.net$,🅿️ PikPak 下载",

  // 游戏下载 cache10-hkg1.steamcontent.com
  "DOMAIN-REGEX,^cache[a-z0-9-]+\.steamcontent\.com$,🎮 游戏平台下载",

  // TapTap
  "DOMAIN-SUFFIX,taptap.io,🎮 游戏",

  // Nikke
  "PROCESS-NAME,nikke.exe,🎮 游戏",
  "PROCESS-NAME,nikke_launcher.exe,🎮 游戏",
  "DOMAIN-SUFFIX,intlgame.com,🎮 游戏",
  "DOMAIN,android.crashsight.wetest.net,🎮 游戏",

  // Hell Divers 2
  // "PROCESS-NAME,helldivers2.exe,🎯 全局直连,no-resolve",
  "PROCESS-NAME,helldivers2.exe,🎮 游戏",

  // The First Descendant
  "PROCESS-NAME,M1-Win64-Shipping.exe,🎮 游戏",

  // torrent
  "DOMAIN-SUFFIX,downloadtorrentfile.com,南极节点",

  // Telegram
  "PROCESS-NAME,Telegram.exe,📲 电报消息",

  // Antigravity
  "PROCESS-NAME,Antigravity.exe,📢 谷歌服务",

  // Github
  "AND,((DOMAIN-SUFFIX,github.com),(DST-PORT,22,DIRECT)),🎯 全局直连",

  // 梯子
  "DOMAIN-SUFFIX,ouonetwork.com,🎯 全局直连",

  // 视频
  "DOMAIN-SUFFIX,dmhy.org,📺 国外视频",
  "DOMAIN-SUFFIX,libvio.cloud,🎯 全局直连",
  "DOMAIN-SUFFIX,ouonet.org,🎯 全局直连",
  "DOMAIN,smart.uhdnow.com,🎯 全局直连",
  "DOMAIN,smart2.uhdnow.com,🎯 全局直连",
  "DOMAIN,mlc.once.im,🎯 全局直连",

  // 论坛
  "DOMAIN-SUFFIX,linux.do,🔰 模式选择",
  "DOMAIN-SUFFIX,forum.bambulab.com,🔰 模式选择",

  // 博客
  "DOMAIN-SUFFIX,duangks.com,🔰 模式选择",

  // EDU
  "DOMAIN-SUFFIX,sjsu.edu,EDU",
  "DOMAIN-SUFFIX,okta.com,EDU",

  // 日本
  "DOMAIN-SUFFIX,dmm.co.jp,日本节点",

  // UK WiFi Call
  // https://github.com/iniwex5/tools/blob/main/rules/UK-wifi-call.list
  // 地区检测
  "DOMAIN-SUFFIX,gspe1-ssl.ls.apple.com,英国节点",
  // 沃达丰
  "DOMAIN-SUFFIX,epdg.epc.mnc015.mcc234.pub.3gppnetwork.org,英国节点",
  "DOMAIN-SUFFIX,ss.epdg.epc.mnc015.mcc234.pub.3gppnetwork.org,英国节点",
  "DOMAIN-SUFFIX,ss.epdg.epc.geo.mnc015.mcc234.pub.3gppnetwork.org,英国节点",
  "DOMAIN-SUFFIX,entsrv-uk.vodafone.com,英国节点",
  "DOMAIN-SUFFIX,vuk-gto.prod.ondemandconnectivity.com,英国节点",
  "IP-CIDR,88.82.0.0/19,英国节点",
  // CMLinkUK EE
  "IP-CIDR,46.68.0.0/17,英国节点",
  // Giffgaff
  "IP-CIDR,87.194.0.0/16,英国节点",
];
// ACL4SSR 规则集
const ACL4SSRRules = [
  // "RULE-SET,AI,🤖 AI 平台",
  // "RULE-SET,Developer,🔰 模式选择",
  // "RULE-SET,Docker,🔰 模式选择",
  // "RULE-SET,BilibiliHMT,📺 哔哩哔哩",
  // "RULE-SET,Bing,Ⓜ️ 微软 Bing",
  // "RULE-SET,GoogleFCM,📢 谷歌 FCM",
  // "RULE-SET,Epic,🎯 全局直连",
  // "RULE-SET,GameDownload,🎯 全局直连",
];
// 规则
const rules = [
  ...customRules,

  // MetaCubeX 规则集
  "RULE-SET,cursor,🔰 模式选择",
  "RULE-SET,deepseek,🤖 AI 平台",
  "RULE-SET,bahamut,📺 巴哈姆特",
  "RULE-SET,bilibili,📺 哔哩哔哩",
  "RULE-SET,pikpak,🅿️ PikPak",
  "RULE-SET,netflix,📹 Netflix",
  "RULE-SET,youtube,📹 YouTube",
  "RULE-SET,spotify,🎧 Spotify",
  "RULE-SET,tiktok,🎶 TikTok",
  "RULE-SET,telegram,📲 电报消息",
  "RULE-SET,google-fcm,📢 谷歌 FCM",
  "RULE-SET,google-play,📢 谷歌 Play",
  "RULE-SET,google-gemini,🤖 AI 平台",
  "RULE-SET,google,📢 谷歌服务",
  "RULE-SET,category-ads-all,❌ 全局拦截",
  "RULE-SET,category-ai-not-cn,🤖 AI 平台",
  "RULE-SET,category-dev,🔰 模式选择",
  "RULE-SET,category-emby,🎬 Emby",
  "RULE-SET,category-game-accelerator-cn,🎯 全局直连",
  "RULE-SET,category-game-platforms-download,🎮 游戏平台下载",
  "RULE-SET,steam,🎮 Steam",
  "RULE-SET,epicgames,🎮 Epic",
  "RULE-SET,ubisoft,🎮 Ubisoft",
  // "RULE-SET,category-games-cn,🎯 全局直连",
  // "RULE-SET,category-games,🎮 游戏",
  "RULE-SET,category-porn,🔞 Porn",
  "RULE-SET,category-pt,👇 下载专用",
  "RULE-SET,category-public-tracker,👇 下载专用",
  "RULE-SET,category-social-media-not-cn,📱 社交媒体",
  "RULE-SET,bing,Ⓜ️ 微软 Bing",
  "RULE-SET,microsoft,Ⓜ️ 微软服务",

  // Loyalsoldier 规则集
  "RULE-SET,direct,🎯 全局直连",
  "RULE-SET,proxy,🔰 模式选择",
  "RULE-SET,reject,❌ 全局拦截",
  "RULE-SET,private,🎯 全局直连",
  "RULE-SET,apple,🍎 苹果服务",
  "RULE-SET,icloud,🍎 苹果服务",
  "RULE-SET,gfw,🔰 模式选择",
  "RULE-SET,tld-not-cn,🔰 模式选择",
  "RULE-SET,telegramcidr,📲 电报消息,no-resolve",
  "RULE-SET,lancidr,🎯 全局直连,no-resolve",
  "RULE-SET,cncidr,🎯 全局直连,no-resolve",
  "RULE-SET,applications,🎯 全局直连",

  // 其他规则
  "GEOIP,LAN,🎯 全局直连,no-resolve",
  "GEOIP,CN,🎯 全局直连,no-resolve",
  "MATCH,🐟 漏网之鱼",
];

// 落地节点
const landingNodeProxies = [
  {
    name: "webshare", // 给你的落地节点起个名字
    server: "", // 替换成你的落地节点 IP 或域名
    port: 12345, // 替换成你的落地节点端口
    type: "socks5",
    username: "", // 替换成你的用户名
    password: "", // 替换成你的密码
    tls: false,
    "skip-cert-verify": true,
    udp: true,
    "dialer-proxy": "🚀 节点选择",
  },
];
const landingNodeNames = landingNodeProxies.map((p) => p.name);

/**
 * 合并多个值或数组，保持顺序并去重
 * @param {...string|Array<string>} items - 要合并的值或数组
 * @returns {Array<string>} 合并并去重后的数组
 */
function mergeUnique(...items) {
  const seen = new Set();
  const result = [];

  for (const item of items) {
    if (Array.isArray(item)) {
      // 处理数组
      for (const element of item) {
        if (element && !seen.has(element)) {
          seen.add(element);
          result.push(element);
        }
      }
    } else if (item && !seen.has(item)) {
      // 处理单个值
      seen.add(item);
      result.push(item);
    }
  }

  return result;
}

// 代理组通用配置
const groupBaseOption = {
  interval: 0,
  timeout: 3000,
  url: "https://www.google.com/generate_204",
  lazy: true,
  "max-failed-times": 3,
  hidden: false,
};
// 代理组通用 proxies
const groupBaseProxies = [
  "🔰 模式选择",
  "🚀 节点选择",
  "🎯 全局直连",
  // "🕊️ 落地节点",
  "♻️ 延迟选优",
  "🚑 故障转移",
  "⚖️ 负载均衡(散列)",
  "☁️ 负载均衡(轮询)",
  "低倍率节点",
];
// 代理组国家 proxies
const groupCountryProxies = [
  "美国节点",
  "英国节点",
  "加拿大节点",
  "澳大利亚节点",
  "德国节点",
  "俄罗斯节点",
  "南极节点",
  "新加坡节点",
  "日本节点",
  "台湾节点",
  "香港节点",
  "澳门节点",
  "韩国节点",
  "印度节点",
  "菲律宾节点",
];
// 代理组配置
const proxyGroupsConfig = [
  {
    ...groupBaseOption,
    name: "🔰 模式选择",
    type: "select",
    proxies: [
      "🚀 节点选择",
      // "🕊️ 落地节点",
      "🎯 全局直连",
    ],
  },
  {
    ...groupBaseOption,
    name: "🚀 节点选择",
    type: "select",
    proxies: [
      "♻️ 延迟选优",
      "🚑 故障转移",
      "⚖️ 负载均衡(散列)",
      "☁️ 负载均衡(轮询)",
    ],
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
  },
  // {
  //   ...groupBaseOption,
  //   name: "🕊️ 落地节点",
  //   type: "select",
  //   proxies: [...landingNodeNames],
  //   icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/openwrt.svg",
  // },
  {
    ...groupBaseOption,
    name: "♻️ 延迟选优",
    type: "url-test",
    tolerance: 50,
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg",
  },
  {
    ...groupBaseOption,
    name: "🚑 故障转移",
    type: "fallback",
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg",
  },
  {
    ...groupBaseOption,
    name: "⚖️ 负载均衡(散列)",
    type: "load-balance",
    strategy: "consistent-hashing",
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg",
  },
  {
    ...groupBaseOption,
    name: "☁️ 负载均衡(轮询)",
    type: "load-balance",
    strategy: "round-robin",
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg",
  },
  {
    ...groupBaseOption,
    name: "美国节点",
    type: "url-test",
    proxies: [
    ],
    "include-all": true,
    "filter": "(?i)\\b(美国|us|united states|united states of america)\\b",
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/us.svg",
  },
  {
    ...groupBaseOption,
    name: "英国节点",
    type: "url-test",
    proxies: [
    ],
    "include-all": true,
    "filter": "(?i)\\b(英国|uk|united kingdom)\\b",
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/gb.svg",
  },
  {
    ...groupBaseOption,
    name: "加拿大节点",
    type: "url-test",
    proxies: [
    ],
    "include-all": true,
    "filter": "(?i)\\b(加拿大|ca|canada)\\b",
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ca.svg",
  },
  {
    ...groupBaseOption,
    name: "澳大利亚节点",
    type: "url-test",
    proxies: [
    ],
    "include-all": true,
    "filter": "(?i)\\b(澳大利亚|au|australia)\\b",
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/au.svg",
  },
  {
    ...groupBaseOption,
    name: "德国节点",
    type: "url-test",
    proxies: [
    ],
    "include-all": true,
    "filter": "(?i)\\b(德国|de|germany)\\b",
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/de.svg",
  },
  {
    ...groupBaseOption,
    name: "俄罗斯节点",
    type: "url-test",
    proxies: [
    ],
    "include-all": true,
    "filter": "(?i)\\b(俄罗斯|ru|russia)\\b",
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ru.svg",
  },
  {
    ...groupBaseOption,
    name: "南极节点",
    type: "url-test",
    proxies: [
    ],
    "include-all": true,
    "filter": "(?i)\\b(南极|南极洲|antarctica|antarctica)\\b",
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/aq.svg",
  },
  {
    ...groupBaseOption,
    name: "新加坡节点",
    type: "url-test",
    proxies: [
    ],
    "include-all": true,
    "filter": "(?i)\\b(新加坡|sg|singapore)\\b",
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/sg.svg",
  },
  {
    ...groupBaseOption,
    name: "日本节点",
    type: "url-test",
    proxies: [
    ],
    "include-all": true,
    "filter": "(?i)\\b(日本|jp|japan)\\b",
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/jp.svg",
  },
  {
    ...groupBaseOption,
    name: "台湾节点",
    type: "url-test",
    proxies: [
    ],
    "include-all": true,
    "filter": "(?i)\\b(台湾|tw|taiwan)\\b",
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/tw.svg",
  },
  {
    ...groupBaseOption,
    name: "香港节点",
    type: "url-test",
    proxies: [
    ],
    "include-all": true,
    "filter": "(?i)\\b(香港|hk|hongkong|hong kong)\\b",
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg",
  },
  {
    ...groupBaseOption,
    name: "澳门节点",
    type: "url-test",
    proxies: [
    ],
    "include-all": true,
    "filter": "(?i)\\b(澳门|macao|macau)\\b",
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg",
  },
  {
    ...groupBaseOption,
    name: "韩国节点",
    type: "url-test",
    proxies: [
    ],
    "include-all": true,
    "filter": "(?i)\\b(韩国|kr|korea)\\b",
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/kr.svg",
  },
  {
    ...groupBaseOption,
    name: "印度节点",
    type: "url-test",
    proxies: [
    ],
    "include-all": true,
    "filter": "(?i)\\b(印度|in|india)\\b",
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/in.svg",
  },
  {
    ...groupBaseOption,
    name: "菲律宾节点",
    type: "url-test",
    proxies: [
    ],
    "include-all": true,
    "filter": "(?i)\\b(菲律宾|ph|philippines)\\b",
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ph.svg",
  },
  {
    ...groupBaseOption,
    name: "低倍率节点",
    type: "select",
    proxies: mergeUnique(
      "🔰 模式选择",
      "🚀 节点选择",
      "🎯 全局直连",
      ...groupCountryProxies,
    ),
    "include-all": true,
    "filter": "(?i)低倍率|low|low rate|0\\.\\dx",
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
  },
  {
    ...groupBaseOption,
    name: "🤖 AI 平台",
    type: "select",
    proxies: mergeUnique(
      ...groupCountryProxies,
      ...groupBaseProxies,
    ),
    "include-all": true,
    "exclude-filter": "(?i)港|hk|hongkong|hong kong|俄|ru|russia|澳|macao",
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg",
  },
  {
    ...groupBaseOption,
    name: "🎮 游戏",
    type: "select",
    proxies: mergeUnique(
      "香港节点",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://img.icons8.com/?size=100&id=11907&format=png&color=000000",
  },
  {
    ...groupBaseOption,
    name: "🎮 游戏平台下载",
    type: "select",
    proxies: mergeUnique(
      "🎯 全局直连",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://img.icons8.com/?size=100&id=11907&format=png&color=000000",
  },
  {
    ...groupBaseOption,
    name: "🎮 Steam",
    type: "select",
    proxies: mergeUnique(
      "香港节点",
      "🎯 全局直连",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/steam.svg",
  },
  {
    ...groupBaseOption,
    name: "🎮 Epic",
    type: "select",
    proxies: mergeUnique(
      "🎯 全局直连",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/epic.svg",
  },
  {
    ...groupBaseOption,
    name: "🎮 Ubisoft",
    type: "select",
    proxies: mergeUnique(
      "🎯 全局直连",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://img.icons8.com/?size=100&id=kRIYZ4mhfdpU&format=png&color=000000",
  },
  {
    ...groupBaseOption,
    name: "👇 下载专用",
    type: "select",
    proxies: mergeUnique(
      "🎯 全局直连",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://img.icons8.com/?size=100&id=12071&format=png&color=000000",
  },
  {
    ...groupBaseOption,
    name: "🎬 Emby",
    type: "select",
    proxies: mergeUnique(
      "低倍率节点",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/embedded.svg",
  },
  {
    ...groupBaseOption,
    name: "🔞 Porn",
    type: "select",
    proxies: mergeUnique(
      "低倍率节点",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://img.icons8.com/?size=100&id=ZodT7FGIa1cj&format=png&color=000000",
  },
  {
    ...groupBaseOption,
    name: "🅿️ PikPak",
    type: "select",
    proxies: mergeUnique(
      "香港节点",
      "低倍率节点",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://cdn.jsdelivr.net/gh/Siriling/my-icons@main/dist/icon/Pikpak.png",
  },
  {
    ...groupBaseOption,
    name: "🅿️ PikPak 下载",
    type: "select",
    proxies: mergeUnique(
      "🎯 全局直连",
      "低倍率节点",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://cdn.jsdelivr.net/gh/Siriling/my-icons@main/dist/icon/Pikpak.png",
  },
  {
    ...groupBaseOption,
    name: "📲 电报消息",
    type: "select",
    proxies: mergeUnique(
      "低倍率节点",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg",
  },
  {
    ...groupBaseOption,
    name: "📹 YouTube",
    type: "select",
    proxies: mergeUnique(
      "低倍率节点",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg",
  },
  {
    ...groupBaseOption,
    name: "📹 Netflix",
    type: "select",
    proxies: mergeUnique(
      "香港节点",
      "低倍率节点",
      ...groupCountryProxies,
      ...groupBaseProxies,
    ),
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/netflix.svg",
  },
  {
    ...groupBaseOption,
    name: "📺 巴哈姆特",
    type: "select",
    proxies: mergeUnique(
      "台湾节点",
      ...groupBaseProxies,
    ),
    "include-all": true,
    icon: "https://i2.bahamut.com.tw/anime/baha_s.png",
  },
  {
    ...groupBaseOption,
    name: "📺 哔哩哔哩",
    type: "select",
    proxies: mergeUnique(
      "🎯 全局直连",
      "低倍率节点",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://raw.githubusercontent.com/free-icons/free-icons/refs/heads/master/svgs/brands-bilibili.svg",
  },
  {
    ...groupBaseOption,
    name: "📺 国外视频",
    type: "select",
    proxies: mergeUnique(
      "低倍率节点",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg",
  },
  {
    ...groupBaseOption,
    name: "🎶 TikTok",
    type: "select",
    proxies: mergeUnique(
      "低倍率节点",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/tiktok.svg",
  },
  {
    ...groupBaseOption,
    name: "🎧 Spotify",
    type: "select",
    proxies: mergeUnique(
      "低倍率节点",
      "香港节点",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://raw.githubusercontent.com/free-icons/free-icons/refs/heads/master/svgs/brands-spotify.svg",
  },
  {
    ...groupBaseOption,
    name: "📱 社交媒体",
    type: "select",
    proxies: mergeUnique(
      "低倍率节点",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/twitter.svg",
  },
  {
    ...groupBaseOption,
    name: "📢 谷歌 FCM",
    type: "select",
    proxies: mergeUnique(
      "美国节点",
      ...groupCountryProxies,
      ...groupBaseProxies,
    ),
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg",
  },
  {
    ...groupBaseOption,
    name: "📢 谷歌 Play",
    type: "select",
    proxies: mergeUnique(
      "美国节点",
      ...groupCountryProxies,
      ...groupBaseProxies
    ),
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google_play.svg",
  },
  {
    ...groupBaseOption,
    name: "📢 谷歌服务",
    type: "select",
    proxies: mergeUnique(
      "美国节点",
      ...groupCountryProxies,
      ...groupBaseProxies,
    ),
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg",
  },
  {
    ...groupBaseOption,
    name: "🍎 苹果服务",
    type: "select",
    proxies: mergeUnique(
      "🎯 全局直连",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg",
  },
  {
    ...groupBaseOption,
    name: "Ⓜ️ 微软 Bing",
    type: "select",
    proxies: mergeUnique(
      "🎯 全局直连",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bing.svg",
  },
  // {
  //   ...groupBaseOption,
  //   name: "Ⓜ️ 微软云盘",
  //   type: "select",
  //   proxies: mergeUnique(
  //     "🎯 全局直连",
  //     ...groupBaseProxies,
  //     ...groupCountryProxies,
  //   ),
  //   "include-all": true,
  //   icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/onedrive.svg",
  // },
  {
    ...groupBaseOption,
    name: "Ⓜ️ 微软服务",
    type: "select",
    proxies: mergeUnique(
      "🎯 全局直连",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg",
  },
  {
    ...groupBaseOption,
    name: "EDU",
    type: "select",
    proxies: mergeUnique(
      "美国节点",
      ...groupCountryProxies,
      ...groupBaseProxies,
    ),
    "include-all": true,
    // icon: "https://icons8.com/icon/nbsqAaIAMGig/student-male",
  },
  {
    ...groupBaseOption,
    name: "🎯 全局直连",
    type: "select",
    proxies: [
      "DIRECT",
      "🚀 节点选择",
    ],
    "include-all": true,
    // icon: "https://icons8.com/icon/y65K0bMdZYmA/direct",
  },
  {
    ...groupBaseOption,
    name: "❌ 全局拦截",
    type: "select",
    proxies: ["REJECT", "DIRECT"],
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg",
  },
  {
    ...groupBaseOption,
    name: "🐬 自定义直连",
    type: "select",
    "include-all": true,
    proxies: mergeUnique(
      "🎯 全局直连",
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg",
  },
  {
    ...groupBaseOption,
    name: "🐳 自定义代理",
    type: "select",
    "include-all": true,
    proxies: mergeUnique(
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/openwrt.svg",
  },
  {
    ...groupBaseOption,
    name: "🐟 漏网之鱼",
    type: "select",
    proxies: mergeUnique(
      ...groupBaseProxies,
      ...groupCountryProxies,
    ),
    "include-all": true,
    icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg",
  },
];

// 多订阅合并，这里添加额外的地址
const proxyProviders = {
  p1: {
    type: "http", // 订阅链接
    url: "https://google.com",
    interval: 86400, // 自动更新时间 86400 (秒) / 3600 = 24 小时
    proxy: "🔰 模式选择",
    override: {
      "additional-prefix": "p1 |", // 节点名称前缀 p1，用于区别机场节点
    },
  },
  // 其他订阅地址
};

// 程序入口
function main(config) {
  const originalProxies = config?.proxies ? [...config.proxies] : [];
  const proxyCount = originalProxies.length;
  const originalProviders = config?.["proxy-providers"] || {};
  const proxyProviderCount =
    originalProviders !== null && typeof originalProviders === "object"
      ? Object.keys(originalProviders).length
      : 0;

  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  config["unified-delay"] = true; // 更换延迟计算方式，去除握手等额外延迟
  config["tcp-concurrent"] = true; // 启用 TCP 并发连接
  config["dns"] = dnsConfig;
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules; // Use the modified rules array defined above

  // Process original proxies (just ensure UDP)
  const processedProxies = originalProxies
    .map((proxy) => {
      if (proxy && typeof proxy === "object" && proxy.name) {
        proxy.udp = true;

        // 节点绑定的接口，从此接口发起连接，适用于部分 VPN 情况
        // proxy["interface-name"] = "WLAN"
        // proxy["interface-name"] = "以太网"
      } else {
        console.warn("警告：发现一个无效或缺少名称的原始代理配置:", proxy);
        return null;
      }
      return proxy;
    })
    .filter((p) => p !== null);

  // Combine proxies
  config["proxies"] = [...processedProxies, ...landingNodeProxies];
  config["proxy-providers"] = {
    ...originalProviders,
    ...proxyProviders,
  };

  // 转义正则元字符，保证名字按“字面量”匹配
  function escapeForRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // 取出所有落地节点的名字，并做转义
  const landingNodeNames = landingNodeProxies.map((p) => p.name);
  const escapedNames = landingNodeNames.map(escapeForRegExp).join("|");

  // 构造只匹配完全等于这些名字的正则
  const excludeLandingFilter = escapedNames ? `^(?:${escapedNames})$` : null;

  // 定义需要排除落地节点的组名
  const groupsToExcludeLandingNodes = [
    "🚀 节点选择",
    "♻️ 延迟选优",
    "⚖️ 负载均衡(散列)",
    "☁️ 负载均衡(轮询)",
  ];

  // 遍历所有代理组配置，为指定的组添加排除落地节点的过滤器
  const finalProxyGroups = proxyGroupsConfig.map((group) => {
    // 检查当前组名是否在需要排除落地节点的列表中，并且确实有落地节点需要排除
    if (
      groupsToExcludeLandingNodes.includes(group.name) &&
      excludeLandingFilter
    ) {
      // 合并已有的 exclude-filter：只要旧规则 或 新排除规则 匹配，就排除
      // 如果 group["exclude-filter"] 已存在，则用 | 连接新旧规则
      // 否则直接使用新的 excludeLandingFilter
      const existingFilter = group["exclude-filter"];
      group["exclude-filter"] = existingFilter
        ? `(${existingFilter})|(${excludeLandingFilter})`
        : excludeLandingFilter;

      console.log(
        `信息：为组 [${group.name}] 添加或合并了落地节点排除过滤器: ${group["exclude-filter"]}`
      );
    }
    return group; // 返回（可能已修改的）组配置
  });

  config["proxy-groups"] = finalProxyGroups; // 使用处理过的代理组
  return config;
}
