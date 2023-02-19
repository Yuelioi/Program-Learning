<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package ripro-v2
 */



get_header();
?>
<div class="col-12">
    <div class="_404">
        <div class="_404-inner">
            <div class="text-center">
                <img class="_404-icon mb-3"
                    src="<?php echo get_template_directory_uri(); ?>/assets/img/empty-state-no-data.svg">
                <p class="card-text text-muted">
                    <?php echo apply_filters('post_no_result_message', esc_html__('您所请求的页面不存在！', 'ripro-v2')); ?>
                </p>
                <p class="card-text text-muted">如果您是访问文档,请转往新的文档站<a href="https://docs.yuelili.com"
                        style="font-weight: 700;"> docs.yuelili.com</a></p>
                </img>
            </div>
        </div>
    </div>
</div>

<?php
get_footer();