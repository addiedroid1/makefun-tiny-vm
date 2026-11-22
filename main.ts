import{mkdirSync as a,readdirSync as b,readFileSync as c,writeFileSync as d}from'node:fs';
let K="04419:>?0000000066666665666566606660000000000000011000000000000052000000000000001141";
for(let x of b('/input')){
let p=c('/input/'+x+'/program.bin'),q=c('/input/'+x+'/input.bin'),n=p.length,D=new Int32Array(256),s=0,E=[],g=0,M=new Int32Array(256),O='',i=0,P=0,T=0,X=0;
try{for(;;){
if(T==1e6)throw 10;
if(P<0||P>=n)throw 9;
let u=p[P];
if(!(u<8||u>15&&u<35&&u!=31||u>47&&u<53||u==64||u==65||u>79&&u<84))throw 5;
let m=u==1?1:u==2?4:u>47&&u<52?2:0;
if(P+m>=n)throw 9;
T++;
let N=P+1+m,k=K.charCodeAt(u)-48,A=k%4;
if(s<A)throw 2;
if(s-A+(k/4|0)>256)throw 3;
P=N;
switch(u){
case 0:throw 0;
case 1:D[s++]=p.readInt8(P-1);break;
case 2:D[s++]=p.readInt32LE(P-4);break;
case 3:s--;break;case 4:D[s]=D[s-1];s++;break;
case 5:[D[s-2],D[s-1]]=[D[s-1],D[s-2]];break;
case 6:D[s]=D[s-2];s++;break;
case 7:[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];break;
case 23:D[s-1]=-D[s-1];break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:{let v=p.readInt16LE(P-2),w=u==48?0:D[--s];if(u==48||(u==49)==(w==0))P+=v;break}
case 51:if(g==64)throw 7;E[g++]=P;P=p[P-2]|p[P-1]<<8;break;
case 52:if(!g)throw 8;P=E[--g];break;
case 64:{let t=D[s-1];if(t<0||t>255)throw 6;D[s-1]=M[t];break}
case 65:{let t=D[s-1],w=D[s-2];if(t<0||t>255)throw 6;s-=2;M[t]=w;break}
case 80:{let t=D[--s]+'';if(O.length+t.length>65536)throw 11;O+=t;break}
case 81:if(O.length>65535)throw 11;O+=String.fromCharCode(D[--s]&255);break;
case 82:D[s++]=i<q.length?q[i++]:-1;break;
case 83:throw D[--s]&255;
default:{let w=D[s-1],z=D[s-2];
if(u>18&&u<23&&!w)throw 4;
D[s-2]=u==16?z+w:u==17?z-w:u==18?Math.imul(z,w):u==19?z/w:u==20?z%w:u==21?(z>>>0)/(w>>>0):u==22?(z>>>0)%(w>>>0):u==24?z&w:u==25?z|w:u==26?z^w:u==28?z<<(w&31):u==29?z>>(w&31):u==30?z>>>(w&31):u==32?+(z==w):u==33?+(z<w):+((z>>>0)<(w>>>0));s--}
}
}}catch(e){X=e}
a('/output/'+x,{recursive:true});
d('/output/'+x+'/stdout.bin',Buffer.from(O,'latin1'));
d('/output/'+x+'/exit.txt',X+'\n');
}
