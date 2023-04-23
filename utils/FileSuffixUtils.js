const FileSuffixUtils = {

  /** 图片格式 */
  imgFormats: ["gif", "webp", "png", "jpg", "jpeg", "bmp", "jpe", "jfif",
    "heif", "hif", "svg", "dib", "tif", "tiff",
    "raw", "crw", "cr2", "kdc", "nef", "arw", "rw2", "psd",
    "image", 'picture', 'photo'],
  /** 视频格式 */
  videoFormats: ['ts', 'mp4', "webm", "flv", "mov", "3gp", 'm4s',
    "mkv", 'avi', "wmv", "rm", "rmvb", "mpeg", "mpg", 'M4V', 'ogv', 'qt',
    "vob", "asf", "mpe", "dat", "mpa", "asx", "avs", 'dv', 'ifo', "avx", 'swf',
    'video', 'movie', 'film', 'clip'],
  /** 音频格式 */
  audioFormats: ["mp3", "weba", "wma", "flac", "ape", "ogg", "aac", "wav", "m4a",
    'amr', 'au', 'aiff', 'AIF', 'midi', "mid", "tta", "wv",
    "tak", 'ra', 'lpac', 'la', "shorten", "optimFROG", 'voice', 'audio', 'sound', 'music'],

  /** 文本格式 */
  textFileFormats: ['txt', 'text'],
  /** 书籍格式 */
  bookFormats: ['pdf', 'mobi', 'epub', 'ebk3', 'chm',
    'fb2', 'cbz', 'cbr', 'cbt', 'cth',
    'azw3', 'azw', 'kfx', 'book'],
  /** office文档格式 */
  officeWordFormats: ['wps', 'pages',
    'doc', 'docx', 'xps', 'rtf', 'wri', 'dot', 'dotx',
    'md', 'markdown', 'odt',
    'word'],

  /** office表格格式 */
  officeTableFormats: ['xls', 'xlsx', 'et', 'xlsm', 'xlsb', 'numbers', 'excel'],
  /** office演示文档格式 */
  officePresentationFormats: ['ppt', 'pptx', 'pps', 'dps', 'pot', 'potx'], // 苹果的演示文档后缀格式为 .key

  /** 压缩文件格式 */
  compressFormats: ['zip', '7z', 'rar', 'tar', 'z', 'gz', 'gzip', 'bz', 'bz2', 'tgz', 'cab', 'ace', 'sea', 'lzh', 'ARJ', "SIT", "SITX"],
  /** 镜像文件格式 */
  mirrorFormats: ['bin', 'iso', 'img', 'gho', 'mds', 'ccd', 'fcd', 'cue', 'bwt', 'cdi', 'nrg', 'pdi', 'b5t', 'tao', 'dao', 'cif'],

  javaFormats: ['java', 'class', 'jar', 'jad', 'war'],
  windowsProgramFormats: ['exe', 'msi', 'bat', 'cmd', 'msu'],
  linuxPackageFormats: ['tgz', 'txz', 'deb', 'rpm', 'pkg', 'xz', 'gz', 'ebuild', 'tar.xz', 'tar.gz', 'pkg.tar.xz', 'pkg.tar.gz', 'package'],
  macosProgramFormats: ['app', 'application'],
  macosPackageFormats: ['dmg'],
  androidPackageFormats: ['apk'],
  iosPackageFormats: ['ipa'],


// .plg，PowerLog J file
// 是一种用于存储测量数据的二进制文件格式。
// 它用于记录在Schlumberger PowerLog软件中进行的采集、处理和分析工程地球物理测量数据，
// 包括电阻率、声波、密度等不同类型的数据。
// PLJ文件包含了具体测量数据的数值、采样点、时间戳以及其他相关信息，
// 这些信息可以被用于数据处理和分析。
// 可以通过PowerLog软件对PLJ文件进行打开、编辑、分析和导出等操作。
// 需要注意的是，PLJ文件是二进制格式，不能直接用文本编辑器进行打开和编辑。

  linkSuffixIs: function (array, link) {
    if (typeof link !== 'string' || CommonUtils.isBlank(link)) {
      throw new TypeError('file link must be a string');
    }
    if(!Array.isArray(array)){
      throw new TypeError('array link must be a Array');
    }
    array.forEach(s => {
      if (link.split('.').pop() === s)
        return true;
    });
    return false;
  },

  isImageFile: function (fileLink) {
    return this.linkSuffixIs(this.imgFormats, fileLink);
  },

  isVideoFile: function (fileLink) {
    return this.linkSuffixIs(this.videoFormats, fileLink);
  },

  isAudioFile: function (fileLink) {
    return this.linkSuffixIs(this.audioFormats, fileLink);
  },

  isCompressFile: function (fileLink) {
    return this.linkSuffixIs(this.compressFormats, fileLink);
  },

  isMirrorFile: function (fileLink) {
    return this.linkSuffixIs(this.mirrorFormats, fileLink);
  },

  isBookFile: function (fileLink) {
    return this.linkSuffixIs(this.bookFormats, fileLink);
  },

}