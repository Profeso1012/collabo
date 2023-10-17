#include "main.h"

int isBinary(const int i) {
	int j = i;
    while (j > 0) {
        int digit = j % 10;
        if (digit != 0 && digit != 1) {
            return 0; /* Not a binary number */
        }
        j /= 10;
    }
    return 1; /* Binary number */
}

int isOctal(const int i) {
	int j = i;
    while (j > 0) {
        int digit = j % 10;
        if (digit >= 8) {
            return 0; /* Not an octal number */
        }
        j /= 10;
    }
    return 1; /* Octal number */
}

int isHexadecimal(const int i) {
	int j = i;
    while (j > 0) {
        int digit = i % 16;
        if (digit >= 10 && digit <= 15) {
            return 0; /* Not a hexadecimal number */
        }
        j /= 16;
    }
    return 1; /* Hexadecimal number */
}

int determineBase(const int i) {
	int j = i;
    if (isBinary(j)) {
        return 2;
    } else if (isOctal(j)) {
        return 8;
    } else if (isHexadecimal(j)) {
        return 16;
    } else {
        return 10; /* Decimal by default */
    }
}

