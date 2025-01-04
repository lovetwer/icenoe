<template>
  <div class="privacy-page">
    <div class="privacy-container">
      <h1 class="page-title">隐私政策</h1>
      
      <div class="privacy-content">
        <section class="privacy-section">
          <h2>信息收集</h2>
          <div class="section-content">
            <h3>我们收集的信息</h3>
            <ul>
              <li>账户信息：用户名、电子邮件地址、密码等注册信息</li>
              <li>使用数据：您在使用我们服务时的操作记录、偏好设置等</li>
              <li>设备信息：设备类型、操作系统、浏览器类型等技术数据</li>
            </ul>

            <h3>收集方式</h3>
            <ul>
              <li>直接提供：您在注册、使用我们的服务时主动提供的信息</li>
              <li>自动收集：通过cookies、日志等技术自动收集的信息</li>
              <li>第三方：从合作伙伴处获取的补充信息</li>
            </ul>
          </div>
        </section>

        <section class="privacy-section">
          <h2>信息使用</h2>
          <div class="section-content">
            <h3>使用目的</h3>
            <ul>
              <li>提供、维护和改进我们的服务</li>
              <li>个性化您的使用体验</li>
              <li>发送服务通知和更新信息</li>
              <li>防止欺诈和提升安全性</li>
            </ul>

            <h3>数据处理</h3>
            <ul>
              <li>严格遵守相关法律法规</li>
              <li>采用行业标准的数据处理方式</li>
              <li>定期审查数据处理流程</li>
            </ul>
          </div>
        </section>

        <section class="privacy-section">
          <h2>信息保护</h2>
          <div class="section-content">
            <h3>安全措施</h3>
            <ul>
              <li>采用加密技术保护数据传输和存储</li>
              <li>实施访问控制和权限管理</li>
              <li>定期进行安全审计和漏洞检测</li>
            </ul>

            <h3>数据存储</h3>
            <ul>
              <li>使用安全可靠的数据中心</li>
              <li>实施数据备份和灾难恢复机制</li>
              <li>定期检查和维护存储系统</li>
            </ul>
          </div>
        </section>

        <section class="privacy-section">
          <h2>信息共享</h2>
          <div class="section-content">
            <h3>共享原则</h3>
            <ul>
              <li>仅在必要的情况下共享信息</li>
              <li>确保第三方遵守隐私保护标准</li>
              <li>获得您的同意后才进行共享</li>
            </ul>

            <h3>共享对象</h3>
            <ul>
              <li>服务提供商和技术合作伙伴</li>
              <li>法律要求的政府机构</li>
              <li>经您授权的第三方</li>
            </ul>
          </div>
        </section>

        <section class="privacy-section">
          <h2>用户权利</h2>
          <div class="section-content">
            <h3>您的权利</h3>
            <ul>
              <li>访问和更正您的个人信息</li>
              <li>删除您的账户和相关数据</li>
              <li>选择退出某些数据收集</li>
              <li>获取您的数据副本</li>
            </ul>

            <h3>行使权利</h3>
            <ul>
              <li>通过账户设置管理个人信息</li>
              <li>联系我们的客服团队获取帮助</li>
              <li>按照平台提供的流程提出请求</li>
            </ul>
          </div>
        </section>

        <section class="privacy-section">
          <h2>政策更新</h2>
          <div class="section-content">
            <p>我们可能会不时更新本隐私政策。当我们进行重大更改时，我们会通过适当方式通知您，例如在我们的网站上发布通知或向您发送电子邮件。</p>
            <p>继续使用我们的服务即表示您同意更新后的隐私政策。我们建议您定期查看本页面以了解最新的隐私保护实践。</p>
          </div>
        </section>

        <section class="privacy-section">
          <h2>联系我们</h2>
          <div class="section-content">
            <p>如果您对本隐私政策有任何疑问、意见或建议，请通过以下方式联系我们：</p>
            <ul>
              <li>电子邮件：privacy@icenoe.com</li>
              <li>客服电话：400-123-4567</li>
              <li>在线客服：工作日 9:00-18:00</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.privacy-page {
  min-height: 100vh;
  background: var(--background);
  color: var(--text);
  padding: 4rem 2rem;
}

.privacy-container {
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(var(--card-bg-rgb), 0.1);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(var(--primary-rgb), 0.1);
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

.privacy-section {
  margin-bottom: 3rem;
}

.privacy-section:last-child {
  margin-bottom: 0;
}

.privacy-section h2 {
  font-size: 1.75rem;
  color: var(--text);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(var(--primary-rgb), 0.1);
}

.section-content {
  padding: 0 1rem;
}

.section-content h3 {
  font-size: 1.25rem;
  color: var(--primary);
  margin: 1.5rem 0 1rem;
}

.section-content p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1rem;
}

.section-content ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
}

.section-content li {
  color: var(--text-secondary);
  line-height: 1.8;
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: 0.5rem;
}

.section-content li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.7rem;
  width: 6px;
  height: 6px;
  background: var(--primary);
  border-radius: 50%;
}

@media (max-width: 768px) {
  .privacy-page {
    padding: 2rem 1rem;
  }

  .privacy-container {
    padding: 2rem 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .privacy-section h2 {
    font-size: 1.5rem;
  }

  .section-content {
    padding: 0;
  }
}
</style> 