/**
 * 工具类：文件后缀
 * @version 0.0.13
 * @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/StringUtils.js
 */
const FileSuffixUtils  = (function () {

  if(!StringUtils){
    console.error("缺少依赖！！！", "工具类：文件后缀 FileSuffixUtils", "StringUtils");
    return {};
  }

  const linkSuffixIs = function (array, link) {
    if ('string' !== typeof link || StringUtils.isBlank(link)) {
      throw new TypeError('file link must be a string');
    }
    if(!Array.isArray(array)){
      throw new TypeError('parameter "array" must be a Array');
    }
    array.forEach(s => {
      let suffix = link.split('.').pop();
      if(suffix.includes('?')) suffix = suffix.split('?')[0];
      if(suffix.includes('&')) suffix = suffix.split('&')[0];
      if (suffix.toUpperCase() === s.toString().toUpperCase()) return true;
      // if(link.toUpperCase().endsWith("." + s.toString().toUpperCase())) return true;
    });
    return false;
  };

  /** 图片格式 */
  const imgFormats = ["webp", "png", "jpg", "jpeg", "bmp", "jpe", "jfif", 'heic',
    "heif", "hif", "svg", "dib", "tif", "tiff", "apng", 'avif', 'avifs', 
    "raw", "crw", "cr2", "kdc", "nef", "arw", "rw2", "psd", 'pbm', 
    'jxl', 'pgm', 'ppm', 'xpm', 'xbm', 'picture', 'photo',
    // "image", 和镜像文件冲突
  ];
  const isImageFile = function (fileLink) {
    return linkSuffixIs(imgFormats, fileLink);
  };


  /** 动态图像(视频)格式 */
  const videoFormats = ['ts', 'mp4', "webm", "flv", "mov", "3gp", 'm4s',
    "mkv", 'avi', "wmv", "rm", "rmvb", "mpeg", "mpg", 'M4V', 'ogv', 'qt', 'm2ts',
    "vob", "asf", "mpe", "dat", "mpa", "asx", "avs", 'dv', 'ifo', "avx", 'swf',
    "gif", 'avif', // 动态图像(无音频)
    'm3u8', // 流媒体地址
    'video', 'movie', 'film', 'clip'];
  const isVideoFile = function (fileLink) {
    return linkSuffixIs(videoFormats, fileLink);
  };



  /** 音频格式 */
  const audioFormats= ["mp3", "weba", "wma", "flac", "ape", "ogg", "aac", "wav", "m4a",
    'amr', 'au', 'aiff', 'AIF', 'aifc', 'midi', "mid", 'sds', "tta", "wv", 'smp',
    'xac', 'iff', 'voc', 'snd', "tak", 'ra', 'lpac', 'la', 'vox', 'cda',
    "shorten", "optimFROG", 'opus', 'voice', 'audio', 'sound', 'music'];
  const isAudioFile = function (fileLink) {
    return this.linkSuffixIs(this.audioFormats, fileLink);
  };


  /** 书籍格式 */
  const bookFormats= ['pdf', 'mobi', 'epub', 'ebk3', 'chm',
    'fb2', 'cbz', 'cbr', 'cbt', 'cth', 'caj',
    'azw3', 'azw', 'kfx',
    'book'];
  const isBookFile= function (fileLink) {
    return linkSuffixIs(bookFormats, fileLink);
  };

  /** 办公文档、出版格式 */
  const officeWordFormats= ['wps', 'ofd', 'pages', // Kingsoft wps / Suwell OFD / Apple office word... formats
    'doc', 'docx', 'xps', 'rtf', 'wri', 'dot', 'dotx', // Microsoft office word formats
    "PUB", // Microsoft Publisher
    'md', 'markdown', 'odt', // Markdown formats
    'word'];

  /** 电子表格格式 */
  const officeTableFormats= ['csv', 'xls', 'xlsx', 'et', 'numbers','ods', 'ods2',
    'excel', 'xlsm', 'xlsb', 'xlsxb', 'xlsm', 'xlsxm', 'xltx', 'xltm', 'WKS'];
  const isOfficeTableFile= function (fileLink) {
    return linkSuffixIs(officeTableFormats, fileLink);
  };

  /** office演示文档格式 */
  const officePresentationFormats= ['ppt', 'pptx', 'pps', 'dps', 'pot', 'potx']; // 苹果的演示文档后缀格式为 .key
  const isOfficePresentationFile=function (fileLink) {
    return linkSuffixIs(officePresentationFormats, fileLink);
  };


  const compressFormats= ['zip', 'zipx', '7z', 'rar', 'tar', 'z', 'gz', 'gzip', "zst", "Asar",
    'bz', 'bz2', 'tgz', 'cab', 'ace', 'sea', 'lzh', 'ARJ', "SIT", "SITX", "Zstd", "xz",
    'arc', "LZMA", "LZ", 'rar5', "LHA", 'TBZ', 'TBZ2', 'ZPAQ', 'ZSTD', 'ALZ', "lzip"];


  const mirrorFormats= ['iso', 'img', 'mds', 'fcd', 'isz',
    'gho', // General Hardware Oriented System Transfer
    'wim', // Windows Imaging Format
    "esd", // Electronic Software Delivery
    'ccd', 'cue', 'bwt', 'cdi', 'nrg', 'pdi', 'b5t', 'tao', 'dao', 'cif', 'UDF',
    'bin', // 二进制文件
  ];


  const windowsProgramFormats= ['exe', 'msi', 'msix', 'msu', 'msp', 'bat', 'cmd', 'com', 'ps1', 'vbs'];
  const windowsProgramExtendFormats= ['dll', 'ocx', 'sys', 'cpl', 'scr', 'pif']; // 与windows应用程序相关联的后缀


  const linuxPackageFormats= ['appimage', 'deb', 'rpm', 'pkg', 'ebuild', // 专用包格式
    'tar.xz', 'tar.gz', 'pkg.tar.xz', 'pkg.tar.gz', // 通用压缩包格式
    'tgz', 'txz', 'xz', 'gz', // 压缩格式
    'package'];


  const androidPackageFormats = ['apk', 'apk.1', 'aab', 'xapk', 'apkm', 'dapk'];


  const webViewFormats = ['html', 'htm', 'xhtml', 'xht', 'xml', 'css', 'BR'];


  const chromiumExtensionFormats = ['crx', ];


  const javaFormats= ['java', 'class', 'jar', 'jad', 'war', 'jsp'];


  return {
    linkSuffixIs,


    imgFormats,
    isImageFile,
    isPhotoFile: isImageFile,
    isPictureFile: isImageFile,


    videoFormats,
    isVideoFile,
    isMovieFile: isVideoFile,
    isFilmFile: isVideoFile,
    isClipFile: isVideoFile,


    audioFormats,
    isAudioFile,
    isVoiceFile: isAudioFile,
    isSoundFile: isAudioFile,
    isMusicFile: isAudioFile,


    /** 文本格式 */
    textFileFormats: ['txt', 'text'],
    markdownFileFormats: ['md', 'markdown', 'conf',],


    bookFormats,
    isBookFile,
    isEbookFile: isBookFile,


    officeWordFormats,
    isOfficeWordFile: function (fileLink) {
      return linkSuffixIs(officeWordFormats, fileLink);
    },


    officeTableFormats,
    officeExcelFormats: officeTableFormats,
    officeTableExcelFormats: officeTableFormats,
    isOfficeTableFile,
    isOfficeExcelFile: isOfficeTableFile,
    isOfficeTableExcelFile: isOfficeTableFile,


    officePresentationFormats,
    officePPTFormats: officePresentationFormats,
    isOfficePresentationFile,
    isOfficePPTFile: isOfficePresentationFile,


    /** 压缩文件格式 */
    compressFormats,
    isCompressFile: function (fileLink) {return linkSuffixIs(compressFormats, fileLink);},


    /** 镜像文件格式 */
    mirrorFormats,
    isMirrorFile: function (fileLink) {
      return linkSuffixIs(mirrorFormats, fileLink);
    },


    windowsProgramFormats,
    windowsProgramExtendFormats,
    isWindowsProgramFile: function (fileLink) {
      return linkSuffixIs(windowsProgramFormats, fileLink);
    },
    isWindowsProgramExtendFile: function (fileLink) {
      return linkSuffixIs(windowsProgramExtendFormats, fileLink);
    },


    linuxPackageFormats,
    isLinuxPackageFile: function (fileLink) {
      return linkSuffixIs(linuxPackageFormats, fileLink);
    },


    macosProgramFormats: ['app', 'application'],
    macosPackageFormats: ['dmg', 'bundle'],
    iosPackageFormats: ['ipa'],


    androidPackageFormats,
    isAndroidPackageFile: function (fileLink) {
      return linkSuffixIs(androidPackageFormats, fileLink);
    },


    webViewFormats,
    isWebViewFile: function (fileLink) {
      return linkSuffixIs(webViewFormats, fileLink);
    },


    chromiumExtensionFormats,
    isChromiumExtensionFile: function (fileLink) {
      return linkSuffixIs(chromiumExtensionFormats, fileLink);
    },


    javaFormats,
    isJavaFile: function (fileLink) {
      return linkSuffixIs(javaFormats, fileLink);
    },


    pythonFormats: ["py", "pyc", "pyd", "pyo", "egg", "whln", "pyw", "ipynb", "pkl", "pickle"],
    databaseFormats: ["sql", 'db', "MDB", 'accdb', 'idf', 'mdf', 'bson', 'rdb'],
    otherDevloperSourcesFormats: ['go', 'js', 'asp', 'cpp', 'c', 'h', 's'],
    devloperConfigurationFormats: ['json', 'yaml', 'yml', 'properties', 'ini', 'properties',],
    gitFormats: ['git', 'gitignore', 'git-annex', 'git-config', 'git-diff'],
    projectIdeConfigurationFormats: ['classpath', 'project', 'iml', ],

  }

// 下面是一些不适合判断或者暂时不判断的文件类型
//  AI  BH    DIF  EPS  MUI    KEXT    SLDM SLDX
// VSDM  VSDX VSS VSSM VST VSTM VSTX
// WBK    WMD WMS  WMZ WP5 WPD   plg

});
console.log("工具类：文件后缀 FileSuffixUtils");