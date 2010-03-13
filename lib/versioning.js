/**
 * @name versioning.js
 * @fileOverview This file contains software versioning utilities
 */
var Versioning = { };

Versioning.DOT_PATTERN = new RegExp("\\.");
Versioning.NON_DIGIT_PATTERN = new RegExp("\\D");
    
Versioning.compareMajor = function(version1, version2) {
  return Versioning.compareLevels(version1, version2, 0);
};

Versioning.compareMinor = function(version1, version2) {
  return Versioning.compareLevels(version1, version2, 1);
};

Versioning.compareRevision = function(version1, version2) {
  return Versioning.compareLevels(version1, version2, 2);
};

/**
 * @private
 * describe Compares two version strings.  This only considers numeric components to
 * a version - all non-digit components (besides the delimiter - period) will
 * be ignored.  Trailing zero components/pieces will be ignored - 
 * i.e. 3.1.0 is equivalent to 3.1, but 3.10 is greater than 3.1 
 * 
 * @param {String} version1 First version string to compare
 * @param {String} version2 Second version string to compare
 * @param {Integer} index 0-index based number to represent the level
 * 
 * @return negative if version1 < version2, 
 *         zero if version1 == version2, 
 *         positive if version1 > version2
 */
Versioning.compareLevels = function(version1, version2, index) {
  var length = index + 1;
  var v1 = Versioning.normalize(version1);
  var v2 = Versioning.normalize(version2);
  if (v1.length > length) {
    v1.length = length;
  }
  if (v2.length > length) {
    v2.length = length;
  }
  return Versioning.cmp(v1, v2);
};

/**
 * describe Compares two version strings.  This only considers numeric components to
 * a version - all non-digit components (besides the delimiter - period) will
 * be ignored.  Trailing zero components/pieces will be ignored - 
 * i.e. 3.1.0 is equivalent to 3.1, but 3.10 is greater than 3.1 
 * 
 * @param {String} version1 First version string to compare
 * @param {String} version2 Second version string to compare
 * 
 * @return negative if version1 < version2, 
 *         zero if version1 == version2, 
 *         positive if version1 > version2
 */
Versioning.compare = function(version1, version2) {
  return Versioning.cmp(Versioning.normalize(version1), Versioning.normalize(version2));
};

/**
 * @private
 * describe Normalizes a version string
 * @param {String} version
 */
Versioning.normalize = function(version) {
  // Trim from Douglas Crockford: http://javascript.crockford.com/remedial.html
  var trimmed = version ? version.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1") : "";
  var pieces  = trimmed.split(Versioning.DOT_PATTERN);
  var parts   = [ ];
  for (var i=0; i<pieces.length; i++) {
    var piece = pieces[i].replace(Versioning.NON_DIGIT_PATTERN, "");
    var num = parseInt(piece);
    if (isNaN(num)) {
      num = 0;  
    }
    parts.push(num);
  }
  var length = parts.length;
  for (var i=length-1; i>=0; i--) {
    var value = parts[i];
    if (value == 0) {
      parts.length--;
    }
    else {
      break;  
    }
  }
  return parts;
};

/**
 * @private
 * describe The return value is negative if x < y, zero if x == y and strictly positive if x > y
 * Same idea as Python's cmp builtin
 * 
 * @param {Array} x Array of ints
 * @param {Array} y Array of ints
 */
Versioning.cmp = function(x, y) {
  var size = Math.min(x.length, y.length);
  for (var i=0; i<size; i++) {
    if (x[i] == y[i]) {
      continue;
    }
    return x[i] < y[i] ? -1 : 1;
  }
  if (x.length == y.length) {
    return 0;
  }
  return x.length < y.length ? -1 : 1;
};