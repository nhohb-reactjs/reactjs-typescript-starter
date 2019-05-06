export interface IUtils {
  isValidEmail(email: string): boolean,
  isValidPhoneNumber(value: string): boolean,
  isValidPassword(value: string): boolean,
  formatPhoneNumber(phoneNumberString: string): string | null,
  formatString(value: string, variables: object): string,
}

class Utils implements IUtils {
  /**
   * Validate email address
   * @param {String} email
   */
  isValidEmail(email: string) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    return !(reg.test(email) === false);
  }

  /**
   * Validate phone number
   * @param {String} value
   */
  isValidPhoneNumber(value: string) {
    let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return !(reg.test(value) === false);
  }

  /**
   * Validate password
   * @param {String} value
   */
  isValidPassword(value: string) {
    return value.length >= 6;
  }

  formatPhoneNumber(phoneNumberString: string) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }

    return null;
  }

  formatString(value: string, variables: object) {
    if (!value) {
      return '';
    }

    return value.replace(/(\{\w+\})/g, (match: any) => {
      return variables[match.replace(/\{|\}/g, '')] || '';
    });
  }
};

export default new Utils();