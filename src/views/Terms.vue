<template>
  <div class="terms-page">
    <div class="terms-container">
      <h1 class="page-title">服务条款</h1>
      
      <div class="terms-content">
        <section class="terms-section">
          <h2>1. 服务说明</h2>
          <p>icenoe（以下简称"本平台"）是一个提供动画效果解决方案的在线平台。通过使用本平台，即表示您同意遵守以下条款。</p>
        </section>

        <section class="terms-section">
          <h2>2. 用户责任</h2>
          <ul>
            <li>用户应确保上传的动画内容不侵犯他人知识产权</li>
            <li>用户应遵守相关法律法规，不得上传违法违规内容</li>
            <li>用户应妥善保管账号信息，因账号泄露造成的损失由用户自行承担</li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>3. 知识产权</h2>
          <p>本平台上的原创动画模板归本平台所有。用户上传的原创内容，其知识产权归用户所有，但用户授权本平台对该内容进行展示、推广等合理使用。</p>
        </section>

        <section class="terms-section">
          <h2>4. 服务变更与终止</h2>
          <ul>
            <li>本平台保留随时修改或终止服务的权利</li>
            <li>对违反服务条款的用户，本平台有权终止其使用权限</li>
            <li>服务变更会提前通知用户，请关注平台公告</li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>5. 免责声明</h2>
          <p>本平台不对因网络、设备等问题导致的服务中断承担责任。对用户因使用本平台服务而产生的任何直接、间接损失不承担责任。</p>
        </section>

        <div class="terms-footer">
          <p>最后更新时间：2024年1月1日</p>
          <p>如有任何问题，请联系我们的客服团队</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.terms-page {
  min-height: 100vh;
  background: var(--background);
  color: var(--text);
  padding: 4rem 2rem;
}

.terms-container {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(var(--card-bg-rgb), 0.1);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  padding: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.terms-section {
  margin-bottom: 3rem;
}

.terms-section h2 {
  font-size: 1.5rem;
  color: var(--primary);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.terms-section h2::before {
  content: '';
  width: 4px;
  height: 1.5rem;
  background: var(--primary);
  border-radius: 2px;
}

.terms-section p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1rem;
}

.terms-section ul {
  list-style: none;
  padding-left: 1.5rem;
}

.terms-section li {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 0.5rem;
  position: relative;
}

.terms-section li::before {
  content: '';
  position: absolute;
  left: -1.5rem;
  top: 0.7rem;
  width: 6px;
  height: 6px;
  background: var(--primary);
  border-radius: 50%;
}

.terms-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(var(--border-rgb), 0.1);
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.terms-footer p {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .terms-page {
    padding: 2rem 1rem;
  }

  .terms-container {
    padding: 2rem 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .terms-section h2 {
    font-size: 1.25rem;
  }
}
</style> 