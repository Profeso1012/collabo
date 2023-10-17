#include "main.h"
#include <stdio.h>

int main()
{
	int len1, len2;
	len1 = _printf("my name is %s, fav alphabet- %c, score: 10%%\n", "emma", 'a');
	len2 = printf("my name is %s, fav alphabet- %c, score: 10%%\n", "emma", 'a');
	printf("%d %d\n", len1, len2);
	return (0);
}
