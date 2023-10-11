console.log("工具类：文件后缀");
/**
 * 工具类：文件后缀
 * @version 0.0.9
 * @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/StringUtils.js
 */
const FileSuffixUtils = {

  linkSuffixIs: function (array, link) {
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
      if (suffix.toUpperCase() === s.toUpperCase()) return true;
      // if(link.toUpperCase().endsWith("." + s.toUpperCase())) return true;
    });
    return false;
  },

  /** 图片格式 */
  imgFormats: ["webp", "png", "jpg", "jpeg", "bmp", "jpe", "jfif", 'heic',
    "heif", "hif", "svg", "dib", "tif", "tiff", "apng", 'avif', 'avifs', 
    "raw", "crw", "cr2", "kdc", "nef", "arw", "rw2", "psd", 'pbm', 
    'jxl', 'pgm', 'ppm', 'xpm', 'xbm', 'picture', 'photo',
    // "image", 和镜像文件冲突
  ],
  isImageFile: function (fileLink) {
    return this.linkSuffixIs(this.imgFormats, fileLink);
  },
  isPhotoFile: function(fileLink){return this.isImageFile(fileLink)},
  isPictureFile: function(fileLink){return this.isImageFile(fileLink)},


  /** 动态图像(视频)格式 */
  videoFormats: ['ts', 'mp4', "webm", "flv", "mov", "3gp", 'm4s',
    "mkv", 'avi', "wmv", "rm", "rmvb", "mpeg", "mpg", 'M4V', 'ogv', 'qt', 'm2ts',
    "vob", "asf", "mpe", "dat", "mpa", "asx", "avs", 'dv', 'ifo', "avx", 'swf',
    "gif", 'avif', // 动态图像(无音频)
    'm3u8', // 流媒体地址
    'video', 'movie', 'film', 'clip'],
  isVideoFile: function (fileLink) {
    return this.linkSuffixIs(this.videoFormats, fileLink);
  },
  isMovieFile: function(fileLink){return this.isVideoFile(fileLink)},
  isFilmFile: function(fileLink){return this.isVideoFile(fileLink)},
  isClipFile: function(fileLink){return this.isVideoFile(fileLink)},

  /** 音频格式 */
  audioFormats: ["mp3", "weba", "wma", "flac", "ape", "ogg", "aac", "wav", "m4a",
    'amr', 'au', 'aiff', 'AIF', 'aifc', 'midi', "mid", 'sds', "tta", "wv", 'smp',
    'xac', 'iff', 'voc', 'snd', "tak", 'ra', 'lpac', 'la', 'vox', 'cda',
    "shorten", "optimFROG", 'opus', 'voice', 'audio', 'sound', 'music'],
  isAudioFile: function (fileLink) {
    return this.linkSuffixIs(this.audioFormats, fileLink);
  },
  isVoiceFile: function(fileLink){return this.isAudioFile(fileLink)},
  isSoundFile: function(fileLink){return this.isAudioFile(fileLink)},
  isMusicFile: function(fileLink){return this.isAudioFile(fileLink)},


  /** 文本格式 */
  textFileFormats: ['txt', 'text'],
  markdownFileFormats: ['md', 'markdown', 'conf',],


  /** 书籍格式 */
  bookFormats: ['pdf', 'mobi', 'epub', 'ebk3', 'chm',
    'fb2', 'cbz', 'cbr', 'cbt', 'cth', 'caj',
    'azw3', 'azw', 'kfx',
    'book'],
  isBookFile: function (fileLink) {
    return this.linkSuffixIs(this.bookFormats, fileLink);
  },
  isEbookFile: function(fileLink){return this.isBookFile(fileLink)},

  /** 办公文档、出版格式 */
  officeWordFormats: ['wps', 'ofd', 'pages', // Kingsoft wps / Suwell OFD / Apple office word... formats
    'doc', 'docx', 'xps', 'rtf', 'wri', 'dot', 'dotx', // Microsoft office word formats
    "PUB", // Microsoft Publisher
    'md', 'markdown', 'odt', // Markdown formats
    'word'],
  isOfficeWordFile: function (fileLink) {
    return this.linkSuffixIs(this.officeWordFormats, fileLink);
  },


  /** 电子表格格式 */
  officeTableFormats: ['csv', 'xls', 'xlsx', 'et', 'numbers','ods', 'ods2',
    'excel', 'xlsm', 'xlsb', 'xlsxb', 'xlsm', 'xlsxm', 'xltx', 'xltm', 'WKS'],
  officeExcelFormats: this.officeTableFormats,
  officeTableExcelFormats: this.officeTableFormats,
  isOfficeTableFile: function (fileLink) {
    return this.linkSuffixIs(this.officeTableFormats, fileLink);
  },
  isOfficeExcelFile: function(fileLink){return this.isOfficeTableFile(fileLink)},
  isOfficeTableExcelFile: function(fileLink){return this.isOfficeTableFile(fileLink)},


  /** office演示文档格式 */
  officePresentationFormats: ['ppt', 'pptx', 'pps', 'dps', 'pot', 'potx'], // 苹果的演示文档后缀格式为 .key
  officePPTFormats: this.officePresentationFormats,
  isOfficePresentationFile: function (fileLink) {
    return this.linkSuffixIs(this.officePresentationFormats, fileLink);
  },
  isOfficePPTFile: function(fileLink){return this.isOfficePresentationFile(fileLink)},


  /** 压缩文件格式 */
  compressFormats: ['zip', 'zipx', '7z', 'rar', 'tar', 'z', 'gz', 'gzip',
    'bz', 'bz2', 'tgz', 'cab', 'ace', 'sea', 'lzh', 'ARJ', "SIT", "SITX",
    'arc', "LZMA", "LZ", 'rar5', "LHA", 'TBZ', 'TBZ2', 'ZPAQ', 'ZSTD', 'ALZ'],
  isCompressFile: function (fileLink) {
    return this.linkSuffixIs(this.compressFormats, fileLink);
  },


  /** 镜像文件格式 */
  mirrorFormats: ['iso', 'img', 'gho', 'mds', 'fcd', 'isz', 'wim',
    'ccd', 'cue', 'bwt', 'cdi', 'nrg', 'pdi', 'b5t', 'tao', 'dao', 'cif', 'UDF',
    'bin', // 二进制文件
  ],
  isMirrorFile: function (fileLink) {
    return this.linkSuffixIs(this.mirrorFormats, fileLink);
  },


  windowsProgramFormats: ['exe', 'msi', 'msix', 'msu', 'msp', 'bat', 'cmd', 'com', 'ps1', 'vbs'],
  windowsProgramExtendFormats: ['dll', 'ocx', 'sys', 'cpl', 'scr', 'pif'], // 与windows应用程序相关联的后缀
  isWindowsProgramFile: function (fileLink) {
    return this.linkSuffixIs(this.windowsProgramFormats, fileLink);
  },
  isWindowsProgramExtendFile: function (fileLink) {
    return this.linkSuffixIs(this.windowsProgramExtendFormats, fileLink);
  },

  linuxPackageFormats: ['appimage', 'deb', 'rpm', 'pkg', 'ebuild', // 专用包格式
    'tar.xz', 'tar.gz', 'pkg.tar.xz', 'pkg.tar.gz', // 通用压缩包格式
    'tgz', 'txz', 'xz', 'gz', // 压缩格式
    'package'],
  isLinuxPackageFile: function (fileLink) {
    return this.linkSuffixIs(this.linuxPackageFormats, fileLink);
  },

  macosProgramFormats: ['app', 'application'],
  macosPackageFormats: ['dmg', 'bundle'],
  iosPackageFormats: ['ipa'],

  androidPackageFormats: ['apk', 'apk.1', 'aab', 'xapk', 'apkm', 'dapk'],
  isAndroidPackageFile: function (fileLink) {
    return this.linkSuffixIs(this.androidPackageFormats, fileLink);
  },

  webViewFormats: ['html', 'htm', 'xhtml', 'xht', 'xml', 'css', 'BR'],
  isWebViewFile: function (fileLink) {
    return this.linkSuffixIs(this.webViewFormats, fileLink);
  },

  chromiumExtensionFormats: ['crx', ],
  isChromiumExtensionFile: function (fileLink) {
    return this.linkSuffixIs(this.chromiumExtensionFormats, fileLink);
  },

  javaFormats: ['java', 'class', 'jar', 'jad', 'war', 'jsp'],
  isJavaFile: function (fileLink) {
    return this.linkSuffixIs(this.javaFormats, fileLink);
  },

  pythonFormats: ["py", "pyc", "pyd", "pyo", "egg", "whln", "pyw", "ipynb", "pkl", "pickle"],
  databaseFormats: ["sql", 'db', "MDB", 'accdb', 'idf', 'mdf', 'bson', 'rdb'],
  otherDevloperSourcesFormats: ['go', 'js', 'asp', 'cpp', 'c', 'h', 's'],
  devloperConfigurationFormats: ['json', 'yaml', 'yml', 'properties', 'ini', 'properties',],
  gitFormats: ['git', 'gitignore', 'git-annex', 'git-config', 'git-diff'],
  projectIdeConfigurationFormats: ['classpath', 'project', 'iml', ],


// 下面是一些不适合判断或者暂时不判断的文件类型
//  AI  BH    DIF  EPS  MUI    KEXT    SLDM SLDX
// VSDM  VSDX VSS VSSM VST VSTM VSTX
// WBK    WMD WMS  WMZ WP5 WPD   plg



}