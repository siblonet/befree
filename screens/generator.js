function incrementAlpha(alpha) {
    const lastChar = alpha.charAt(alpha.length - 1);
    const rest = alpha.slice(0, -1);
    if (lastChar === 'Z') {
      return rest ? incrementAlpha(rest) + 'A' : 'A'.repeat(alpha.length + 1);
    }
    return rest + String.fromCharCode(lastChar.charCodeAt(0) + 1);
  }
  
  export default function getNextIdentifier(uniclast) {
    let prefix = uniclast.split("-")[0];
    let middle = uniclast.split("-")[1];
    let suffix = parseInt(uniclast.split("-")[2], 10);
  
    suffix++;
    middle = incrementAlpha(middle);
  
    if (middle === 'AAAA') {
      middle = 'AAA';
      prefix = incrementAlpha(prefix);
    }
  
    const currentIdentifier = `${prefix}-${middle}-${suffix.toString().padStart(3, '0')}`;
    return currentIdentifier;
  }
    