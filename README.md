# winAPPCli
VUE+ElementUI+electron 开发windows应用程序

该脚手架集成了vue、typescript、elementUI、electron。可用来开发web应用，也可以开发windows的exe应用。
注：若要在.vue文件中使用typescript语法。只需替换<script>标签为<script lang="ts">即可。

脚手架的入口文件为main.ts文件。

依赖安装：
	npm i   建议设置好淘宝镜像代理再安装


运行：
	npm run dev    运行网页版本页面
	npm run exe    运行exe应用程序（与网页版差别就是可以双击独立运行，而不用依赖浏览器）
	npm run build  打包网页版本的包（打包出来的目录为dist）
	npm run packge 打包exe应用程序（打包的出来的目录为target）
	
	
注意：初次打包需要下载exe打包依赖程序，下载过程比较慢，若出现无法下载情况下，请手动下载同步到c盘用户的cache目录下。