document.addEventListener('DOMContentLoaded',()=>{
    const bar=document.querySelector('.progress-bar');
    window.addEventListener('scroll',()=>{
        const h=document.documentElement.scrollHeight-window.innerHeight;
        const scrolled=(window.scrollY/h)*100;
        bar.style.width=scrolled+'%';
    });
    document.querySelectorAll('.accordion-header').forEach(header=>{
        header.addEventListener('click',()=>{
            const content=header.nextElementSibling;
            content.style.display=content.style.display==='block'?'none':'block';
        });
    });
    const search=document.getElementById('search');
    if(search){
        search.addEventListener('input',e=>{
            const val=e.target.value.toLowerCase();
            document.querySelectorAll('.casino-card').forEach(card=>{
                const title=card.querySelector('.card-title')?.innerText.toLowerCase();
                card.style.display=title?.includes(val)?'':'none';
            });
        });
    }
});