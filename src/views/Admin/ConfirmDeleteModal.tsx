'use client'

import { Modal } from '@/shared/components/ui/Modal'
import { Button } from '@/shared/components/ui/Button'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

interface ConfirmDeleteModalProps {
  userId: string
  userName: string
  onConfirm: (adminId: string) => Promise<any>
  onCancel: () => void
  loading: boolean
}

export function ConfirmDeleteModal({
  userId,
  userName,
  onConfirm,
  onCancel,
  loading,
}: ConfirmDeleteModalProps) {
  const { data: session } = useSession()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    if (!session?.user?.id) return

    setIsDeleting(true)
    try {
      await onConfirm(session.user.id)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Modal onClose={onCancel}>
      <Modal.Content size="sm">
        <Modal.Header>
          <Modal.Title>Desactivar usuario</Modal.Title>
          <Modal.Close onClick={onCancel} />
        </Modal.Header>

        <Modal.Body>
          <p className="text-[14px]" style={{ color: 'var(--color-text-soft)' }}>
            ¿Desactivar a{' '}
            <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
              {userName}
            </span>
            ?
          </p>
          <p className="text-[13px] mt-2" style={{ color: 'var(--color-text-muted)' }}>
            El usuario podrá reactivarse más adelante. No se eliminarán sus datos.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isDeleting || loading}
            variant="danger"
          >
            {isDeleting ? 'Desactivando...' : 'Desactivar'}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
