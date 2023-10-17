#ifndef MAIN_H
#define MAIN_H

#include <stdarg.h>
#include <unistd.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>
#include <stdbool.h>

int _printf(const char *format, ...);
int print_int(int value, int base);
void custom_itoa(int num, char* buffer);

int custom_atoi(const char* str);

int isBinary(const int i);
int isOctal(const int i);
int isHexadecimal(const int i);
int determineBase(const int i);

int octalToDecimal(int octal);
int hexCharToDecimal(char hex);
int hexadecimalToDecimal(char* hex);
int binaryToDecimal(int binary);


#endif
