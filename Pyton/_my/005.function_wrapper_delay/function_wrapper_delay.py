'''2025.04.29 18:39 IMM'''
import matplotlib.pyplot as plt
import matplotlib.patches as patches

fig, ax = plt.subplots(figsize=(10, 6))
ax.set_xlim(0, 10)
ax.set_ylim(0, 7)
ax.axis('off')

# Функция delay
ax.add_patch(patches.Rectangle((1, 4.5), 3, 2, fill=True, color="#cce5ff", edgecolor='black'))
ax.text(2.5, 6.3, "delay(f, ms)", ha='center', va='center', fontsize=12, weight='bold')
ax.text(2.5, 5.8, "создает новую", ha='center', fontsize=10)
ax.text(2.5, 5.4, "функцию-обертку", ha='center', fontsize=10)

# Стрелка к обертке
ax.annotate("", xy=(4, 5.5), xytext=(5, 5.5),
            arrowprops=dict(arrowstyle="->", linewidth=2))

# Обертка
ax.add_patch(patches.Rectangle((5, 4.5), 3.5, 2, fill=True, color="#d4edda", edgecolor='black'))
ax.text(6.75, 6.3, "Обертка (...args)", ha='center', va='center', fontsize=12, weight='bold')
ax.text(6.75, 5.8, "ждет вызова", ha='center', fontsize=10)
ax.text(6.75, 5.4, "и вызывает f", ha='center', fontsize=10)
ax.text(6.75, 5.0, "через setTimeout", ha='center', fontsize=10)

# Стрелка к результату
ax.annotate("", xy=(6.75, 4.4), xytext=(6.75, 3.5),
            arrowprops=dict(arrowstyle="->", linewidth=2))

# Результат выполнения
ax.text(6.75, 3.2, 'Через ms мс:\nвызов f(...args)', ha='center', fontsize=11, bbox=dict(facecolor='white', edgecolor='black'))

plt.title("Схема: почему delay возвращает функцию", fontsize=14)
plt.tight_layout()
plt.show()
