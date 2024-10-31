<div id="wrapper"><header id="header"><nav id="nav" class="clearfix"><ul><li id="insert_code"><a href="javascript:void(0)">save</a></li><li id="load"><a href="javascript:void(0)"><?php echo __('load','santu'); ?></a></li><li id="from_html"><a href="javascript:void(0)"><?php echo __('from html','santu'); ?></a></li><li id="rect" class="selected"><a href="javascript:void(0)"><?php echo __('rectangle','santu'); ?></a></li><li id="circle"><a href="javascript:void(0)"><?php echo __('circle','santu'); ?></a></li><li id="polygon" ><a href="javascript:void(0)"><?php echo __('polygon','santu'); ?></a></li><li id="edit"><a href="javascript:void(0)">edit</a></li><li id="to_html"><a href="javascript:void(0)"><?php echo __('to html','santu'); ?></a></li><li id="preview"><a href="javascript:void(0)">preview</a></li><li id="clear"><a href="javascript:void(0)"><?php echo __('clear','santu'); ?></a></li><li id="new_image"><a href="javascript:void(0)"><?php echo __('new image','santu'); ?></a></li><li id="show_help"><a href="javascript:void(0)">?</a></li><li ><a href="javascript:void(0)" onclick="cancel_mapping()"><?php echo __('cancel','santu'); ?></a></li></ul></nav><input type="hidden" id="selected-img-name"><div id="coords"></div><div id="debug"></div></header><div id="image_wrapper"><div id="image"><img src="" alt="#" id="img"><svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" id="svg"></svg></div></div></div><?php /* For html image map code */ ?><div id="code"><span class="close_button" title="close"></span><div id="code_content"></div></div>
<?php /* Edit details block */ ?>
<form id="edit_details">
	<h5><?php echo __('Attributes','santu'); ?></h5>
	<span class="close_button" title="close"></span>
	<p>
		<label for="href_attr"><?php echo __('URL','santu'); ?> <a href="<?php echo get_option("santu_buy_now_product",false); ?>" style="float: right;font-size: 12px;color: #fff" target="santu_app">	<?php echo __('Find','santu'); ?></a>&nbsp; </label>
		<input type="text" id="href_attr">
	</p>
	<p>
		<label for="alt_attr"><?php echo __('Alt','santu'); ?></label>
		<input type="text" id="alt_attr">
	</p>
	<p>
		<label for="title_attr"><?php echo __('Title','santu'); ?></label>
		<input type="text" id="title_attr">
	</p>
	<button id="save_details"><?php echo __('Save','santu'); ?></button>
</form>
<?php /*From html block*/ ?>
<div id="from_html_wrapper"><form id="from_html_form"><h5><?php echo __('Loading areas','santu'); ?></h5><span class="close_button" title="close"></span><p><label for="code_input"><?php echo __('Enter your html code','santu'); ?>:</label><textarea id="code_input"></textarea></p><button id="load_code_button"><?php echo __('Load','santu'); ?></button></form></div><?php /* Get image form */ ?><div id="get_image_wrapper"><div id="get_image"><div id="loading"><?php echo __('Loading','santu'); ?></div><div id="file_reader_support"><label><?php echo __('Drag an image','santu'); ?></label><div id="dropzone"><span class="clear_button" title="clear">x</span> <img src="" alt="preview" id="sm_img"></div><b><?php echo __('or','santu'); ?></b></div><label for="url"><?php echo __('type a url','santu'); ?></label><span id="url_wrapper"><span class="clear_button" title="clear">x</span><input type="text" id="url"></span><button id="button"><?php echo __('OK','santu'); ?></button></div></div><?php /* Help block */ ?><div id="overlay"></div><div id="help"><span class="close_button" title="close"></span><div class="txt"><section><h2><?php echo __('Main','santu'); ?></h2><p><span class="key">F5</span> &mdash; <?php echo __('reload the page and display the form for loading image again','santu'); ?></p><p><span class="key">S</span> &mdash; <?php echo __('save map params in localStorage','santu'); ?></p></section><section><h2><?php echo __('Drawing mode (rectangle / circle / polygon)','santu'); ?></h2><p><span class="key">ENTER</span> &mdash; <?php echo __('stop polygon drawing (or click on first helper)','santu'); ?></p><p><span class="key">ESC</span> &mdash; <?php echo __('cancel drawing of a new area','santu'); ?></p><p><span class="key">SHIFT</span> &mdash; <?php echo __('square drawing in case of a rectangle and right angle drawing in case of a polygon','santu'); ?></p></section><section><h2><?php echo __('Editing mode','santu'); ?></h2><p><span class="key">DELETE</span> &mdash; <?php echo __('remove a selected area','santu'); ?></p><p><span class="key">ESC</span> &mdash; <?php echo __('cancel editing of a selected area','santu'); ?></p><p><span class="key">SHIFT</span> &mdash; <?php echo __('edit and save proportions for rectangle','santu'); ?></p><p><span class="key">I</span> &mdash; <?php echo __('edit attributes of a selected area (or dblclick on an area)','santu'); ?></p><p><span class="key">CTRL</span> + <span class="key">C</span> &mdash; <?php echo __('a copy of the selected area','santu'); ?></p><p><span class="key">&uarr;</span> &mdash; <?php echo __('move a selected area up','santu'); ?></p><p><span class="key">&darr;</span> &mdash; <?php echo __('move a selected area down','santu'); ?></p><p><span class="key">&larr;</span> &mdash; <?php echo __('move a selected area to the left','santu'); ?></p><p><span class="key">&rarr;</span> &mdash; <?php echo __('move a selected area to the right','santu'); ?></p></section></div></div>