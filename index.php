<?php

const NULL_STATE = "Nothing here yet!";
$annotations = array();


$raw_manifest = file_get_contents("manifest.json");
$raw_annotations = file_get_contents("annotations.txt");

$has_manifest = check($raw_manifest);
$has_annotations = check($raw_annotations);

$has_source = false;
$has_desc = false;
$has_type = false;
$has_name = false;

if (!$has_manifest);
else 
{
	$has_manifest = true;
	
	$manifest = json_decode($raw_manifest);
	$git = $manifest->git;
	$type = $manifest->type;
	$name = $manifest->name;
	$name = $type . '&mdash;' . $name;
	$desc = $manifest->description;
	$author = $manifest->author;
	
	if (check($git))
	{
		$has_source = true;
		$source = nl2br(file_get_contents($git));
	}
	
	if (check($desc)) $has_desc = true;
	if (check($type)) $has_type = true;
	if (check($name)) $has_name = true;
}

if (!$has_annotations);
else
{
	$has_annotations = true;
	$raw_annotations = split("---", nl2br($raw_annotations));
	
	for ($i = 0; $i < sizeof($raw_annotations); $i++)
	{
	$item = $raw_annotations[$i];
	$item = split("--", $item);
	
	$annotations[$i]["code"] = str_replace("<br />", "", $item[0]);
	$annotations[$i]["code"] = preg_replace("/\n/", "", $annotations[$i]["code"], 1);
	$annotations[$i]["notes"] = str_replace("<br />", "", $item[1]);
	}
}	

function check($str) {
	return strlen($str) > 0 ? true : false;
}

?>
<!doctype html>
<html>

<head>
	<title><?php if ($has_name && $has__type) echo $name ?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="author" content="<?php echo $author ?>">
	<meta name="og:author" content="<?php echo $author ?>">
	<meta name="description" content="<?php echo $desc ?>">
	<meta property="og:description" content="<?php echo $desc ?>">
	<meta rel="manifest" href="manifest.json">
	<link href="css/main.css" type="text/css" rel="stylesheet">
	<link rel="stylesheet" href="vendor/styles/atom-one-dark.css">
</head>

<body>
	<div class="preloader"></div>
	<div class="flex-container">
		<section class="flex-left bg-gray">
			<div class="code-wrapper">
				<?php if ($has_desc): ?>
					<p class="p-no-border"><?php echo $desc; ?></p>
				<?php else: ?>
					<p class="p-no-border p-center"><?php echo NULL_STATE; ?></p>
				<?php endif; ?>
			</div>
			<?php if ($has_annotations): ?>
			<?php for ($i = 0; $i < sizeof($annotations); $i++):?>
				<div class="code-wrapper">
					<pre><code class="java"><?php echo $annotations[$i]["code"] ?></code></pre>
					<p><?php echo $annotations[$i]["notes"] ?></p>
				</div>
			<?php endfor; endif; ?>
		</section>
		<section class="flex-right bg-dark-gray">
			<div class="code-wrapper-light">
				<?php if ($has_source): ?>
					<pre><code class="java"><?php echo $source ?></code></pre>
				<?php else: ?>
					<pre><code class="java p-center"><?php echo NULL_STATE ?></code></pre>
				<?php endif; ?>
			</div>
			<button onclick="location.href='<?php echo $git?>'">Download the Source Code</button>
		</section>
	</div>

	<script src="vendor/highlight.pack.js"></script>
	<script src="vendor/js/jquery-3.1.1.min.js"></script>
	<script src="vendor/js/velocity.js"></script>
	<script src="js/app.js" type="text/javascript"></script>
	
	<script>hljs.initHighlightingOnLoad();</script>
</body>

</html>