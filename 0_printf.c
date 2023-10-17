#include "main.h"

int _printf(const char *format, ...)
{
    int input = 0;
    va_list arguments;
    char c;
    int l;
    char *str;

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
                case '%':
                    write(1, format, 1);
                    input++;
                    break;
                case 'c':
                    c = va_arg(arguments, int);
                    write(1, &c, 1);
                    input++;
                    break;
                case 's':
                    str = va_arg(arguments, char*);
                    l = strlen(str);
                    write(1, str, l);
                    input += l;
                    break;
                default:
                    /*Handle invalid format specifiers*/
                    break;
            }
        }
        format++;
    }

    va_end(arguments);
    return (input);
}

