(function (c) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = 1;
    script.src = c.managerUrl;
    let head = document.getElementsByTagName('head')[0];
    head.insertBefore(script, head.firstChild);
    window.rom = window.rom || {cmd: [], icmd: []};
    window.rom.icmd = window.rom.icmd || [];
    window.rom.icmd.push(c);
})({"adBlockMode":"iframe","managerUrl":"https:\/\/cdn-plus.roxot-panel.com\/roxot-wrapper\/js\/roxot-manager-engine.js?v=s-4f2f371e-5eed-4871-81fb-a3cb952ccdc3","wrapperUrl":"https:\/\/cdn-plus.roxot-panel.com\/roxot-wrapper\/js\/roxot-wrapper.js?v=s-4f2f371e-5eed-4871-81fb-a3cb952ccdc3","placementConfigTemplate":"https:\/\/cdn-plus.roxot-panel.com\/wrapper-builder\/placement\/__PLACEMENT_ID__?v=d-97b461ee-71a0-43c8-b2fb-7f23d5defc99","isLanguageSpecific":false,"hostConfig":{"habr.com":{"wrapperOptions":[]}},"isBrowserSpecific":false,"isOsSpecific":false,"isDeviceTypeSpecific":false,"dynamicUrlTemplate":"","wrapperConfig":{"prebid":{"adjustment":{"mytarget":0.1,"rtbhouse":0.2,"otm":0.85,"rubicon":0.8,"getintent":0.5,"segmento":0.85},"path":"https:\/\/cdn-plus.roxot-panel.com\/roxot-wrapper\/js\/prebid.js?v=s-4f2f371e-5eed-4871-81fb-a3cb952ccdc3"},"adfox":{"hb":{"biddersMap":{"betweenDigital":"1471719","myTarget":"1471718","otm":"1471725","segmento":"1496136","hybrid":"1505514","adriver":"1508036","rtbhouse":"1393902","criteo":"1393905","getintent":"1393904","videonow":"1407059"},"timeout":1000}}},"lazyLoading":[]})