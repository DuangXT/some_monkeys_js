console.log("工具类：文件后缀");
// @require https://raw.githubusercontent.com/DuangXT/some_monkeys_js/main/utils/StringUtils.js
/**
 * 工具类：文件后缀
 * @version 0.0.4
 */
const FileSuffixUtils = {

  linkSuffixIs: function (array, link) {
    if ('string' !== typeof link || StringUtils.isBlank(link)) {
      throw new TypeError('file link must be a string');
    }
    if(!Array.isArray(array)){
      throw new TypeError('array link must be a Array');
    }
    array.forEach(s => {
      if (link.split('.').pop().toUpperCase() === s.toUpperCase()) return true;
      // if(link.toUpperCase().endsWith("." + s.toUpperCase())) return true;
    });
    return false;
  },

  /** 图片格式 */
  imgFormats: ["webp", "png", "jpg", "jpeg", "bmp", "jpe", "jfif",
    "heif", "hif", "svg", "dib", "tif", "tiff",
    "raw", "crw", "cr2", "kdc", "nef", "arw", "rw2", "psd",
    'picture', 'photo',
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
    'azw3', 'azw', 'kfx', 'book'],
  isBookFile: function (fileLink) {
    return this.linkSuffixIs(this.bookFormats, fileLink);
  },
  isEbookFile: function(fileLink){return this.isBookFile(fileLink)},

  /** office文档格式 */
  officeWordFormats: ['wps', 'ofd', 'pages', // Kingsoft wps / Suwell OFD / Apple office word... formats
    'doc', 'docx', 'xps', 'rtf', 'wri', 'dot', 'dotx', // Microsoft office word formats
    'md', 'markdown', 'odt', // Markdown formats
    'word'],
  isOfficeWordFile: function (fileLink) {
    return this.linkSuffixIs(this.officeWordFormats, fileLink);
  },


  /** office表格格式 */
  officeTableFormats: ['csv', 'xls', 'xlsx', 'et', 'numbers','ods', 'ods2', 'excel', 'xlsm', 'xlsb', 'xlsxb', 'xlsm', 'xlsxm', 'xltx', 'xltm', ],
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
  compressFormats: ['zip', 'zipx', '7z', 'rar', 'tar', 'z', 'gz', 'gzip', 'bz', 'bz2', 'tgz', 'cab', 'ace', 'sea', 'lzh', 'ARJ', "SIT", "SITX"],
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

  webViewFormats: ['html', 'htm', 'xhtml', 'xht', 'xml', 'css'],
  isWebViewFile: function (fileLink) {
    return this.linkSuffixIs(this.webViewFormats, fileLink);
  },

  chromiumExtensionFormats: ['crx', 'cr2', 'kdc', 'nef', ],
  isChromiumExtensionFile: function (fileLink) {
    return this.linkSuffixIs(this.chromiumExtensionFormats, fileLink);
  },

  javaFormats: ['java', 'class', 'jar', 'jad', 'war', 'jsp'],
  isJavaFile: function (fileLink) {
    return this.linkSuffixIs(this.javaFormats, fileLink);
  },

  pythonFormats: ["py", "pyc", "pyd", "pyo", "egg", "whln", "pyw", "ipynb", "pkl", "pickle"],
  otherDevloperSourcesFormats: ['go', 'js', 'asp', 'cpp', 'c', 'h', 's'],
  devloperConfigurationFormats: ['json', 'yaml', 'yml', 'properties', 'ini', 'properties',],
  gitFormats: ['git', 'gitignore', 'git-annex', 'git-config', 'git-diff'],
  projectIdeConfigurationFormats: ['classpath', 'project', 'iml', ],

//  AI  ALZ  ARC  BH  BR
//      DIF     EGG EPS  MUI   PST PUB
//     KEXT LHA LZ  LZMA   MDB
// SLDM SLDX  TBZ TBZ2    TLZ    VSD VSDM
// VSDX VSS VSSM VST VSTM VSTX   WBK  WKS  WMD WMS
//  WMZ WP5 WPD       ZPAQ ZSTD

// .plg，PowerLog J file
// 是一种用于存储测量数据的二进制文件格式。
// 它用于记录在Schlumberger PowerLog软件中进行的采集、处理和分析工程地球物理测量数据，
// 包括电阻率、声波、密度等不同类型的数据。
// PLJ文件包含了具体测量数据的数值、采样点、时间戳以及其他相关信息，
// 这些信息可以被用于数据处理和分析。
// 可以通过PowerLog软件对PLJ文件进行打开、编辑、分析和导出等操作。
// 需要注意的是，PLJ文件是二进制格式，不能直接用文本编辑器进行打开和编辑。




}