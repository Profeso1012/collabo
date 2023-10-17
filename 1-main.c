#include "main.h"
#include <stdio.h>

int main() {
	int octal_num = 037;
	int hex_num = 0x1A;
	int num = 41;
        int len1, len2, len3, len4;

        _printf("my age is %d\n", num);
        printf("my age is %d\n", num);
        len1 = _printf("my age is %d\n", num);
        len2 = printf("my age is %d\n", num);
        printf("%d : %d\n", len1, len2);
        len3 = _printf("Octal: %i, Hexadecimal: %i\n", octal_num, hex_num);
	len4 = printf("Octal: %i, Hexadecimal: %i\n", octal_num, hex_num);
	printf("%d : %d\n", len3, len4);
	return 0;
}
