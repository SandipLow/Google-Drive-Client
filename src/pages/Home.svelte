<section class="banner-home">
    <div class="content">
        <div style="text-align: center;">
            <div class="support-quote">
                <span>YOUR</span>
                <span>GOOGLE</span>
                <span>DRIVE</span>
                <span>CLIENT</span>
            </div>
            <button class="donate-btn">Get Started</button>
        </div>
    </div>
</section>

<style>
    .support-quote {
        font-size: 64px;
        font-weight: bold;
    }

    .support-quote span {
        display: inline-block;
        margin: 0 8px;
    }

    .support-quote span:nth-child(odd) {
        color: brown;
    }

    .support-quote span:nth-child(even) {
        color: blueviolet;
    }

    .banner-home {
        overflow: hidden;
        position: relative;
    }

    .banner-home .content {
        display: grid;
        align-items: center;
        justify-content: center;
        position: relative;
        height: calc(100vh - 88px);
    }

    .banner-home::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        height: 95%;
        width: 100%;
        background: linear-gradient(135deg, var(--col1), var(--col2));
        border-radius: 0 0 50% 50%/0 0 100% 100%;
        transform: scaleX(1.5);
    }

    .donate-btn {
        display: inline;
        margin-top: 96px;
        width: fit-content;
        padding: 12px 24px;
        font-size: 24px;
        background-color: transparent;
        border: 1px solid var(--col3);
        box-shadow: 10px 10px;
    }

    .donate-btn:hover {
        background-color: var(--col2);
    }
</style>
