#include <stdio.h>
#include <inttypes.h>
//Function to change one endian to another
uint32_t ChangeEndianness(uint32_t u32Value)
{
    uint32_t u32Result = 0;
    u32Result |= (u32Value & 0x000000FF) << 24;
    u32Result |= (u32Value & 0x0000FF00) << 8;
    u32Result |= (u32Value & 0x00FF0000) >> 8;
    u32Result |= (u32Value & 0xFF000000) >> 24;
    return u32Result;
}
int main()
{
    int ciclos;
    int result=0;
    printf("Introduce cuantos valores quieres transformar a Little Endian");
    scanf("%d",&ciclos);
    uint32_t u32CheckData[ciclos];
    uint32_t u32ResultData[ciclos];
    for (size_t i = 0; i < ciclos; ++i)
    {
        printf("Introduce el valor Hexadecimal con este formato: \"0xABBCCDD\":");
        scanf("%x", &u32CheckData[i]);
        
        //swap the data
        u32ResultData[i] = ChangeEndianness(u32CheckData[i]);
        printf("0x%x\n",u32ResultData[i]);
    }

    //converted data
    return 0;
}