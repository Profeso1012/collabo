#include "main.h"

/* Function pointer type for custom conversion functions */
typedef int (*ConversionFunction)(const int i);

int custom_atoi_wrapper(const int i) {
    char str[20]; /* Allocate a buffer to hold the integer as a string */
    custom_itoa(i, str); /* Convert the integer to a string */
    return custom_atoi(str); /* Convert the string to an integer */
}


int convertToDecimal(const int i, int (*converter)(const int)) {
	    return converter(i);
}


int _printf(const char* format, ...) {
    int input = 0;
    int i;
    va_list arguments;
    char buffer[20];
    int l = 0;
    int d;


    if (!format)
        return (-1);

    va_start(arguments, format);

    while (*format) {
        if (*format != '%') {
            write(1, format, 1);
            input++;
        } else {
            format++;
            switch (*format) {
                case '\0':
                    break;
                case 'd':
		    d = va_arg(arguments, int);
                    custom_itoa(d, buffer);
                    l = strlen(buffer);
                     write(1, buffer, l);
                    input += l;
                    break;
                case 'i': {
                    i = va_arg(arguments, int);
                    if (isBinary(i) || isOctal(i) || isHexadecimal(i)) {
                        int decimal = convertToDecimal(i, custom_atoi_wrapper);
                        custom_itoa(decimal, buffer);
                    } else {
                        custom_itoa(i, buffer);
                    }
                    l = strlen(buffer);
                    write(1, buffer, l);
                    input += l;
                    break;
                }
                default:
                    /* Handle invalid format specifiers */
                    break;
            }
        }
        format++;
    }

    va_end(arguments);
    return input;
}



void custom_itoa(int num, char *buffer) {
    int i = 0;
    int divisor = 1;
    if (num == 0) {
        buffer[i++] = '0';
    } else {
        if (num < 0) {
            buffer[i++] = '-';
            num = -num;
        }
        while (num / divisor >= 10) {
            divisor *= 10;
        }
        while (divisor > 0) {
            buffer[i++] = (num / divisor) + '0';
            num %= divisor;
            divisor /= 10;
        }
    }
    buffer[i] = '\0';  /*Null-terminate the string.*/
}


int custom_atoi(const char* str) {
  int base = 10;
  int num = 0;
  int i = 0;

  /*Check if the string is empty.*/
  if (!str || !str[0]) {
    return 0;
  }

  /* Check if the string starts with a base prefix.*/
  if (str[0] == '0') {
    if (str[1] == 'x') {
      base = 16;
      str++;
    } else if (str[1] == 'b') {
      base = 2;
      str++;
    } else {
      base = 8;
    }
  }

  /* Convert the string to an integer.*/
  while (str[i] != '\0') {
    int digit = str[i] - '0';
    if (digit < 0 || digit >= base) {
      return 0;
    }
    num = num * base + digit;
    i++;
  }

  return num;
}
