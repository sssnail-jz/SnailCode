/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	
	// %REMOVE_START%
	// The configuration options below are needed when running CKEditor from source files.
	config.plugins = 'html5video,emoji,autocomplete,textwatcher,textmatch,dialogui,dialog,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,notification,button,toolbar,clipboard,panelbutton,panel,floatpanel,colorbutton,colordialog,xml,ajax,templates,menu,contextmenu,copyformatting,div,editorplaceholder,resize,elementspath,enterkey,entities,exportpdf,popup,filetools,filebrowser,find,floatingspace,listblock,richcombo,font,fakeobjects,forms,format,horizontalrule,htmlwriter,iframe,wysiwygarea,image,indent,indentblock,indentlist,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastetools,pastefromgdocs,pastefromlibreoffice,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,scayt,stylescombo,tab,table,tabletools,tableselection,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,codesnippet';
	config.skin = 'moonocolor';
	// %REMOVE_END%

	// Define changes to default configuration here. For example:
	config.baseFloatZIndex = 1000000000;
	config.language = 'zh-cn';
	config.uiColor = '#AADC6E';
	CKEDITOR.config.height = 600;
	CKEDITOR.config.width = 'auto';
	config.colorButton_enableMore = true;
};
